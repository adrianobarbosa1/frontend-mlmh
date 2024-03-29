import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../../services/apiClient";

type User = {
    email: string;
    name: string;
    role: string;
};

type SignData = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentials: SignData): Promise<void>;
    signOut: () => void;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshToken')

    authChannel.postMessage('signOut');

    Router.push('/login')
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    break;
                default:
                    break;
            }
        }
    }, [])

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if (token) {
            api.get('/users/me')
                .then(response => {
                    const { email, role, name } = response.data

                    setUser({ email, role, name })
                })
                .catch(() => {
                    signOut();
                })
        }
    }, [])

    async function signIn({ email, password }: SignData) {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            })

            const { name, role } = response.data.user;
            const { token: accessToken } = response.data.tokens.access;
            const { token: refreshToken } = response.data.tokens.refresh;

            setCookie(undefined, 'nextauth.token', accessToken, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })

            setUser({
                email: response.data.user.email,
                name,
                role,
            })

            api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

            Router.push('/dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}