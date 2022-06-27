import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Radio,
    RadioGroup,
    Input as ChakraInput,
    Select,
    SimpleGrid,
    VStack,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import NumberFormat from "react-number-format";
import { cpf } from 'cpf-cnpj-validator';
import { useState } from "react";
import { dispatch } from "react-hot-toast/dist/core/store";
import { addIntegrante, postExistCpf } from "../../features/register/registerSlice";
import { useAppDispatch } from "../../app/hooks";

interface ModalProps<TFieldValues extends FieldValues = FieldValues, TContext = any> {
    isOpen: boolean;
    onClose: () => void;
    errors: FieldErrors<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    control: Control<TFieldValues, TContext>;
}

type VerifyErrors = {
    name: string;
    nascimento: string;
    gfCpf: string;
    rgCertidao: string;
    rendaBruta: string;
    pcd: string;
    parentesco: string;
    maiorDezoito: string;

}

export const ModalGrupoFamiliar = ({ isOpen, onClose }: ModalProps) => {
    const [name, setName] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [gfCpf, setGfCpf] = useState('')
    const [rgCertidao, setRgCertidao] = useState('')
    const [rendaBruta, setRendaBruta] = useState('')
    const [pcd, setPcd] = useState('')
    const [parentesco, setParentesco] = useState('')
    const [maiorDezoito, setMaiorDezoito] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useAppDispatch()

    const setStateErrors = (name, error) => {
        setErrors(prev => ({ ...prev, [name]: error }))
    }

    const limparCampos = () => {
        setName('')
        setNascimento('')
        setGfCpf('')
        setRgCertidao('')
        setRendaBruta('')
        setPcd('')
        setParentesco('')
        setMaiorDezoito('')
    }

    const onClick = () => {
        const dataSend = {
            gf_nome: name,
            gf_dt_nascimento: nascimento,
            gf_cpf: gfCpf,
            gf_rgCertidao: rgCertidao,
            gf_renda_bruta: rendaBruta,
            gf_pcd: pcd,
            gf_parentesco: parentesco
        }

        const erros = verifyErrors()
        if (Object.keys(erros).length == 0) {
            // dispatch(addIntegrante(dataSend))
            // limparCampos()
        }
    }

    const validDate = (dateString) => {
        var today = new Date();
        dateString = dateString.split('/').reverse().join('-');
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; };
        if (age >= 18) {
            setMaiorDezoito(true)
        } else {
            setMaiorDezoito(false)
        }
        verifyErrors()
    }

    const verificarCpf = (cpf) => {
        dispatch(postExistCpf(cpf))
        verifyErrors()
    }

    const verifyErrors = () => {
        setErrors({})
        const erros: VerifyErrors = {}

        if (!name) erros.name = 'Nome é obrigatório.'
        else if (name.length < 6) erros.name = 'Preencha com pelo menos 6 letras.'
        if (!nascimento) erros.nascimento = 'Data de nascimento é obrigatorio.'
        if (maiorDezoito) {
            if (gfCpf && !cpf.isValid(gfCpf)) erros.gfCpf = 'CPF inválido.'
            if (!gfCpf) { erros.gfCpf = 'CPF é obrigatório.' }
        } else {
            if (!rgCertidao) erros.rgCertidao = 'RG ou Certidão é obrigatório.'
        }
        if (!rendaBruta) erros.rendaBruta = 'Renda bruta é obrigatorio'
        if (!pcd) erros.pcd = 'O campo portador de deficiência é obrigatório'
        if (!parentesco) erros.parentesco = 'Parentesco é obrigatorio'

        setErrors(erros)
        return erros;
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de integrante no grupo familiar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing='4'>
                            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
                                <FormControl isInvalid={errors.name} >
                                    <FormLabel htmlFor='gf_nome'>
                                        <Box display='inline-block' mr={3}>
                                            Nome Completo*
                                        </Box>
                                    </FormLabel>
                                    <ChakraInput bgColor='gray.50'
                                        // {...register("gf_nome", { required: "Nome é obrigatório." })}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        onBlur={verifyErrors}
                                    />
                                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.nascimento}>
                                    <FormLabel htmlFor='gf_dt_nascimento'>
                                        <Box display='inline-block' mr={3}>
                                            Data de nascimento*
                                        </Box>

                                    </FormLabel>

                                    <NumberFormat
                                        customInput={ChakraInput}
                                        bgColor='gray.50'
                                        format='##/##/####'
                                        value={nascimento}
                                        onChange={e => setNascimento(e.target.value)}
                                        onBlur={e => validDate(e.target.value)}
                                    />

                                    <FormErrorMessage>{errors.nascimento}</FormErrorMessage>
                                </FormControl>

                                {maiorDezoito &&
                                    <FormControl isInvalid={errors.gfCpf}>
                                        <FormLabel htmlFor='gf_cpf'>
                                            <Box display='inline-block' mr={3}>
                                                CPF*
                                            </Box>

                                        </FormLabel>

                                        <NumberFormat
                                            customInput={ChakraInput}
                                            bgColor='gray.50'
                                            format='###.###.###-##'
                                            value={gfCpf}
                                            onChange={e => setGfCpf(e.target.value)}
                                            onBlur={e => verificarCpf(e.target.value)}

                                        />

                                        <FormErrorMessage>{errors.gfCpf}</FormErrorMessage>
                                    </FormControl>
                                }

                                {!maiorDezoito &&
                                    <FormControl isInvalid={errors.rgCertidao} >
                                        <FormLabel htmlFor='gf_rg_certidao'>
                                            <Box display='inline-block' mr={3}>
                                                RG ou Certidão de nascimento*
                                            </Box>
                                        </FormLabel>
                                        <ChakraInput bgColor='gray.50'
                                            value={rgCertidao}
                                            onChange={e => setRgCertidao(e.target.value)}
                                            onBlur={verifyErrors}
                                        />
                                        <FormErrorMessage>{errors.rgCertidao}</FormErrorMessage>
                                    </FormControl>
                                }


                                <FormControl isInvalid={errors.rendaBruta}>
                                    <FormLabel htmlFor='renda_bruta'>
                                        <Box display='inline-block' mr={3}>
                                            Renda bruta
                                        </Box>
                                        <Popover>
                                            <PopoverTrigger>
                                                <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverBody bg='yellow.100'>Considera-se renda familiar o somatório da renda
                                                    individual dos componentes do mesmo Grupo/Núcleo Familiar.</PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </FormLabel>

                                    <NumberFormat
                                        customInput={ChakraInput}
                                        bgColor='gray.50'
                                        thousandSeparator='.'
                                        prefix="R$"
                                        decimalSeparator=','
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        value={rendaBruta}
                                        onChange={e => setRendaBruta(e.target.value)}
                                        onBlur={verifyErrors}
                                    />

                                    <FormErrorMessage>{errors.rendaBruta}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.pcd}>
                                    <Flex direction='column'>
                                        <FormLabel as='legend'>Portador de deficiência?*</FormLabel>
                                        <RadioGroup
                                            value={pcd}
                                            onChange={e => setPcd(e)}
                                            onBlur={verifyErrors}
                                        >
                                            <HStack spacing='24px'>
                                                <Radio value='sim' type="radio">Sim</Radio>
                                                <Radio value='nao' type="radio">Não</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormErrorMessage>{errors.pcd}</FormErrorMessage>
                                    </Flex>
                                </FormControl>

                                <FormControl isInvalid={errors.parentesco}>
                                    <Flex direction='column'>
                                        <Select placeholder='Parentesco*'
                                            value={parentesco}
                                            onChange={e => setParentesco(e.target.value)}
                                            onBlur={verifyErrors}
                                        >
                                            <option value='Esposo/Esposa'>1. Esposo/Esposa</option>
                                            <option value='Companheiro/Companheira'>2. Companheiro/Companheira</option>
                                            <option value='Filho/Filha'>3. Filho/Filha</option>
                                            <option value='Irmão/Irmã'>4. Irmão/Irmã</option>
                                            <option value='Pai/Mãe'>5. Pai/Mãe</option>
                                            <option value='Padrasto/Madrasta'>6. Padrasto/Madrasta</option>
                                            <option value='Avô/Avó'>7. Avô/Avó</option>
                                            <option value='Tio/Tia'>9. Tio/Tia</option>
                                            <option value='Tutor(a), Tutelado(a) ou Curador(a) e Curatelado(a)'>8. Tutor(a), Tutelado(a) ou Curador(a) e Curatelado(a)</option>

                                        </Select>
                                        <FormErrorMessage>{errors.parentesco}</FormErrorMessage>
                                    </Flex>
                                </FormControl>

                            </SimpleGrid>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type='button'
                            onClick={onClick}
                            mb="16px"
                            bg='yellowOficial'
                            color='text'
                            fontSize="xs"
                            variant="no-effects"
                            px="30px"
                        >
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
