import axios from 'axios'
import { api } from '../../services/api';
import { Register, RegisterProtocolo } from './register.interface';

export async function cepAddress(cep: string): Promise<any | undefined> {
    try {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json`);
        return response;
    } catch (error) {
        if (error instanceof Error) alert(JSON.stringify(error.message));
    }
}

export async function cpfExist(cpf: string): Promise<any | undefined> {
    const response = api
        .get(`/register/${cpf}`)
        .then((response) => {
            console.log(response)
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
    return response;
}

export async function loginProtocolo(protocolo: RegisterProtocolo): Promise<any | undefined> {
    const response = api
        .post<RegisterProtocolo>(`/register/login-protocolo`, protocolo)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
    return response;
}

export async function updateRegister(data: Register): Promise<any | undefined> {
    const response = api
        .put(`/register`, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
    return response;
}

export async function registerCreate(data: Register) {
    const response = api
        .post<RegisterProtocolo>("/register", data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error.response.data.message);
        });
    return response;
}

export async function existeCpf(cpf: string) {
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