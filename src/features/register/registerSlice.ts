import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Register, RegisterProtocolo, RegisterState } from "./register.interface";
import { cepAddress, cpfExist, existeCpf, loginProtocolo, registerCreate, updateRegister } from "./registerAPI";

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

export const getCpfExist = createAsyncThunk(
    "register/getCpfExist",
    async (cpf: string) => {
        const response = await cpfExist(cpf);
        return response.data;
    }
);

export const getLoginProtocolo = createAsyncThunk(
    "register/getLoginProtocolo",
    async (protocolo: RegisterProtocolo) => {
        const response = await loginProtocolo(protocolo);
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

export const putRegister = createAsyncThunk(
    "register/putRegister",
    async (data: Register) => {
        const response = await updateRegister(data);
        return response.data;
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
        limparIntegrante: (state: RegisterState) => {
            state.integrantes = []
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
            .addCase(getCpfExist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCpfExist.fulfilled, (state, action) => {
                state.status = "idle";
                state.register = { ...state.register, ...action.payload };
            })
            .addCase(getCpfExist.rejected, (state, action) => {
                state.status = "idle";
            })
            .addCase(postRegister.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postRegister.fulfilled, (state, action) => {
                state.status = "idle";
                state.register.protocolo = action.payload;
            })
            .addCase(postRegister.rejected, (state, action) => {
                state.status = "idle";
            })
            .addCase(putRegister.pending, (state) => {
                state.status = "loading";
            })
            .addCase(putRegister.fulfilled, (state, action) => {
                state.status = "idle";
            })
            .addCase(putRegister.rejected, (state, action) => {
                state.status = "idle";
            })
            .addCase(postExistCpf.pending, (state) => {
                state.status = "loading";
            })
            .addCase(postExistCpf.fulfilled, (state, action) => {
                state.status = "idle";
                state.cpfExiste = action.payload;
            })
            .addCase(getLoginProtocolo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLoginProtocolo.fulfilled, (state, action) => {
                state.status = "idle";
                state.integrantes = action.payload.integrantes
                state.register = { ...state.register, ...action.payload };
            })
            .addCase(getLoginProtocolo.rejected, (state, action) => {
                state.status = "idle";
            })
    },
})

export const { registerUser, addIntegrante, removeIntegrante, limparIntegrante } = registerSlice.actions;

export const selectRegister = (state: AppState) => state.register;

export default registerSlice.reducer;