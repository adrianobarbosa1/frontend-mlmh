export interface Register {
    cpf: string;
    nome: string;
    email: string;
    rg: string;
    uf_rg: string;
    dt_nascimento: string;
    fone_celular: string;
    fone_fixo?: string;
    sexo: string;
    portador_pcd: string;
    estado_civil: string;
    nacionalidade: string;
    cep: string;
    logradouro: string;
    quadra: string;
    lote: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    reside_ano: string;
    renda_bruta: string;
    cadunico: string;
    numero_cadunico: string;
    possui_imovel: string;
    contemplado_habitacional: string;
    comprador_imovel: string;
    arrimo_familia: string;
    vitima_violencia: string;
    grupo_familiar: string;
    protocolo: string;
    integrantes: Integrante[]
}

export interface Integrante {
    integrante: string;
    gf_nome: string;
    gf_dt_nascimento: string;
    gf_cpf?: string;
    gf_rg_certidao?: string;
    gf_pcd: string;
    gf_parentesco: string;
}

export interface RegisterState {
    register: Register;
    cpfExiste: boolean;
    integrantes: Integrante[]
    status: "idle" | "loading" | "failed";
}

export interface RegisterResponse {
    protocolo: string;
}