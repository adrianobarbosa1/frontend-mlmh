import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../components/contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    }
})

api.interceptors.response.use(response => {
    return response;
}, (err: AxiosError) => {
    if (err.response.data?.code) {
        if (err.response.data?.message === 'Please authenticate') {
            cookies = parseCookies();

            const { 'nextauth.refreshToken': refreshToken } = cookies;
            const originalConfig = err.config

            if (!isRefreshing) {
                isRefreshing = true;

                api.post('/auth/refresh-tokens', {
                    refreshToken,
                }).then(response => {
                    console.log(response)
                    const { token: accessToken } = response.data.access;
                    const { token: refreshTokenResponse } = response.data.refresh;

                    setCookie(undefined, 'nextauth.token', accessToken, {
                        maxAge: 60 * 60 * 24 * 30, //30 dias
                        path: '/'
                    })
                    setCookie(undefined, 'nextauth.refreshToken', refreshTokenResponse, {
                        maxAge: 60 * 60 * 24 * 30, //30 dias
                        path: '/'
                    })

                    api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

                    failedRequestQueue.forEach(request => request.onSuccess(accessToken))
                    failedRequestQueue = [];
                }).catch(err => {
                    failedRequestQueue.forEach(request => request.onFailure(err))
                    failedRequestQueue = [];
                }).finally(() => {
                    isRefreshing = false;
                })
            }

            return new Promise((resolve, reject) => {
                failedRequestQueue.push({
                    onSuccess: (token: string) => {
                        originalConfig.headers['Authorization'] = `Bearer ${token}`

                        resolve(api(originalConfig))
                    },
                    onFailure: (err: AxiosError) => {
                        reject(err)
                    }
                })
            })
        } else {
            signOut()
        }
    }

    return Promise.reject(err)
})

