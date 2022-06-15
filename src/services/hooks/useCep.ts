// import axios from "axios";
// import { useQuery } from "react-query"

// type Cep = {
//     logradouro: string;
//     bairro: string;
//     localidade: string;
//     uf: string;
// }

// export async function getCep(cep: string): Promise<Cep | undefined> {
//     try {
//         const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
//         const address = {
//             localidade: data.localidade,
//             uf: data.uf,
//             logradouro: data.logradouro,
//             bairro: data.bairro,

//         }
//         return address
//     } catch (error) {
//         if (error instanceof Error) alert(JSON.stringify(error.message));
//     }

// }

// export function useCep() {
//     return useQuery('address', () => getCep(cep), {
//         staleTime: 1000 * 5,
//     })
// }