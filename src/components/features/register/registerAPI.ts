import axios from 'axios'

export async function cepAddress(cep: string) {
    try {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json`);
        return response;
    } catch (error) {
        if (error instanceof Error) alert(JSON.stringify(error.message));
    }
}

