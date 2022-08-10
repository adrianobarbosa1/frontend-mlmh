import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../components/contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ?
            'http://apimlmh.anapolis.go.gov.br:3001/api/v1' :
            'http://localhost:3001/api/v1',
        headers: {
            Authorization: `Bearer ${cookies['nextauth.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (err: AxiosError) => {
        if (err.response.data?.code === 401) {
            if (err.response.data?.message === 'Please authenticate') {
                cookies = parseCookies(ctx);

                const { 'nextauth.refreshToken': refreshToken } = cookies;
                const originalConfig = err.config

                if (!isRefreshing) {
                    isRefreshing = true;

                    api.post('/auth/refresh-tokens', {
                        refreshToken,
                    }).then(response => {
                        const { token: accessToken } = response.data.access;
                        const { token: refreshTokenResponse } = response.data.refresh;

                        setCookie(ctx, 'nextauth.token', accessToken, {
                            maxAge: 60 * 60 * 24 * 30, //30 dias
                            path: '/'
                        })
                        setCookie(ctx, 'nextauth.refreshToken', refreshTokenResponse, {
                            maxAge: 60 * 60 * 24 * 30, //30 dias
                            path: '/'
                        })

                        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

                        failedRequestQueue.forEach(request => request.onSuccess(accessToken))
                        failedRequestQueue = [];
                    }).catch(err => {
                        failedRequestQueue.forEach(request => request.onFailure(err))
                        failedRequestQueue = [];

                        if (typeof window === 'undefined') {
                            signOut()
                        }
                    }).finally(() => {
                        isRefreshing = false;
                    })
                }

                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: (token: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${token}`

                            resolve(api(originalConfig))
                        },
                        onFailure: (err: AxiosError) => {
                            reject(err)
                        }
                    })
                });
            } else {
                if (typeof window === 'undefined') {
                    signOut()
                } else {
                    return Promise.reject(new AuthTokenError())
                }
            }
        }

        return Promise.reject(err);
    });
    return api;
}


