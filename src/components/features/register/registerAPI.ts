import axios from 'axios'

export async function cepAddress(cep: string): Promise<any | undefined> {
    try {
        const response = axios.get(`https://viacep.com.br/ws/${cep}/json`);
        console.log(response)
        return response;
    } catch (error) {
        if (error instanceof Error) alert(JSON.stringify(error.message));
    }
}

