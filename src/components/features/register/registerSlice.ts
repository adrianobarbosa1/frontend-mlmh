import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../../app/store";
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
    localidade: string;
    bairro: string;
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

// export const { addEventAthlete, removeEventAthlete } = registerSlice.actions;

export const selectRegister = (state: AppState) => state.register;

export default registerSlice.reducer;