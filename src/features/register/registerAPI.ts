import axios from 'axios'
import { api } from '../../services/api';

export async function cepAddress(cep: string): Promise<any | undefined> {
    try {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json`);
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

export async function existeCpf(cpf) {
    // const response = await fetch('/api/counter', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ amount }),
    // })
    // const result = await response.json()

    return true;
}