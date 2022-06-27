import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { string } from "yup";
import { AppState } from "../../app/store";
import { cepAddress, existeCpf, registerCreate } from "./registerAPI";

export interface Register {
    nome: string;
    email: string;
    cpf: string;
    dt_nascimento: string;
    fone: string;
    sexo: string;
    estado_civil: string;
    nacionalidade: string;
    cep: string;
    uf: string;
    localidade: string;
    bairro: string;
    quadra: string;
    lote: string;
    logradouro: string;
    complemento: string;
    rg: string;
    uf_rg: string;
    protocolo: string;
}

interface Integrante {
    integrante: string;
    gf_nome: string;
    gf_dt_nascimento: string;
    gf_cpf: string;
    gf_rg_certidao: string;
    gf_renda_bruta: string;
    gf_pcd: string;
    gf_parentesco: string;
}

export interface RegisterState {
    register: Register;
    cpfExiste: boolean;
    integrantes: Integrante[]
    status: "idle" | "loading" | "failed";
}

const initialState: RegisterState = {
    register: {
        nome: "",
        email: "",
        estado_civil: "",
        nacionalidade: "",
        cep: "",
        complemento: "",
        cpf: "",
        dt_nascimento: "",
        fone: "",
        sexo: "",
        logradouro: "",
        bairro: "",
        lote: "",
        localidade: "",
        quadra: "",
        rg: "",
        uf: "",
        uf_rg: "",
        protocolo: "",
    },
    cpfExiste: false,
    integrantes: [],
    status: "idle",
};

export const getCepAddress = createAsyncThunk(
    "register/getCepAddress",
    async (cep: string) => {
        const response = await cepAddress(cep);
        return response.data;
    }
);

export const postRegister = createAsyncThunk(
    "register/postRegister",
    async (data) => {
        const response = await registerCreate(data);
        return response;
    }
);

export const postExistCpf = createAsyncThunk(
    'register/postExistCpf',
    async (cpf) => {
        const response = await existeCpf(cpf)
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.register = action.payload
        },
        addIntegrante: (state, action) => {
            const integrante = action.payload
            integrante.integrante = state.integrantes.length + 1
            state.integrantes.push(integrante)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCepAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCepAddress.fulfilled, (state, action) => {
                state.status = "idle";
                state.register = { ...state.register, ...action.payload };
            })
            .addCase(postRegister.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postRegister.fulfilled, (state, action) => {
                state.status = "idle";
                state.register = action.payload;
            })
            .addCase(postExistCpf.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postExistCpf.fulfilled, (state, action) => {
                state.status = "idle";
                state.cpfExiste = action.payload;
            })
    },
})

export const { registerUser, addIntegrante } = registerSlice.actions;

export const selectRegister = (state: AppState) => state.register;

export default registerSlice.reducer;