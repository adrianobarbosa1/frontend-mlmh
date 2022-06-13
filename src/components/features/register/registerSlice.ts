import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cepAddress } from "./registerAPI";

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
    municipio: string;
    quadra: string;
    lote: string;
    logradouro: string;
    complemento: string;
    rg: string;
    uf_rg: string;
}

export interface RegisterState {
    register: Register;

    status: "idle" | "loading" | "failed";
}

const initialState: RegisterState = {
    register: {
        cep: "",
        complemento: "",
        cpf: "",
        dt_nascimento: "",
        fone: "",
        sexo: "",
        logradouro: "",
        lote: "",
        municipio: "",
        quadra: "",
        rg: "",
        uf: "",
        uf_rg: "",
    },
    status: "idle",
};

export const getCepAddress = createAsyncThunk(
    "register/getCepAddress",
    async (cep: string) => {
        const response = await cepAddress(cep);
        return response.data;
    }
);

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {

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
    },
})