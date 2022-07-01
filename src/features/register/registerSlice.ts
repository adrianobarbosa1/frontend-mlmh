import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Register, RegisterState } from "./register.interface";
import { cepAddress, existeCpf, registerCreate } from "./registerAPI";

const initialState: RegisterState = {
    register: {
        cpf: "",
        nome: "",
        email: "",
        rg: "",
        uf_rg: "",
        dt_nascimento: "",
        fone_celular: "",
        fone_fixo: "",
        sexo: "",
        portador_pcd: "",
        estado_civil: "",
        nacionalidade: "",
        cep: "",
        logradouro: "",
        quadra: "",
        lote: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
        reside_ano: "",
        renda_bruta: "",
        cadunico: "",
        numero_cadunico: "",
        possui_imovel: "",
        contemplado_habitacional: "",
        comprador_imovel: "",
        arrimo_familia: "",
        vitima_violencia: "",
        grupo_familiar: "",
        protocolo: "",
        integrantes: [],
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
    async (data: Register) => {
        const response = await registerCreate(data);
        return response.data.protocolo
    }
);

export const postExistCpf = createAsyncThunk(
    'register/postExistCpf',
    async (cpf: string) => {
        const response = await existeCpf(cpf)
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
        addIntegrante: (state: RegisterState, action) => {
            const integrante = action.payload
            integrante.integrante = state.integrantes.length + 1
            state.integrantes.push(integrante)
        },
        removeIntegrante: (state: RegisterState, action: PayloadAction<string>) => {
            const integranteIndex = state.integrantes.map((e) => e.integrante).indexOf(action.payload);
            state.integrantes.splice(integranteIndex, 1);
        },
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
                state.register.protocolo = action.payload;
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

export const { registerUser, addIntegrante, removeIntegrante } = registerSlice.actions;

export const selectRegister = (state: AppState) => state.register;

export default registerSlice.reducer;