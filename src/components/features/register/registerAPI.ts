import axios from 'axios'
import { api } from '../../../services/api';

export async function cepAddress(cep: string): Promise<any | undefined> {
    try {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json`);
        console.log(response)
        return response;
    } catch (error) {
        if (error instanceof Error) alert(JSON.stringify(error.message));
    }
}

export async function registerCreate(data) {
    const response = api
        .post("/register", data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
    return response;
}