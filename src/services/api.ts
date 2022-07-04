import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://10.10.100.45:3001/api/v1'
})

