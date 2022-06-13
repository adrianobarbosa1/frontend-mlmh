import { useQuery } from "react-query"
import { api } from "../api"

type Register = {
    id: string;
    name: string;
    email: string;
}

export async function getRegister(): Promise<Register> {
    const { data } = await api.get('register')

    const registers = data.register.map(register => {
        return {
            id: register.id,
            name: register.name,
            email: register.email,
            createdAt: new Date(register.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return registers
}

export function useRegister() {
    return useQuery('register', getRegister, {
        staleTime: 1000 * 5,
    })
}