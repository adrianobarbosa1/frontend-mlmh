import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'http://apimlmh.anapolis.go.gov.br:3001/api/v1' :
        'http://localhost:3001/api/v1',
})