import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://meulotemh_backend:3001/api/v1'
})

