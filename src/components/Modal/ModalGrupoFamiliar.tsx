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
    useToast,
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
import NumberFormat from "react-number-format";
import { cpf } from 'cpf-cnpj-validator';
import { useState } from "react";
import { addIntegrante, getCpfExist, postExistCpf } from "../../features/register/registerSlice";
import { useAppDispatch } from "../../app/hooks";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type VerifyErrors = {
    name: string;
    nascimento: string;
    gfCpf: string;
    rgCertidao: string;
    pcd: string;
    parentesco: string;
    maiorDezoito: string;

}

interface ErrorForm {
    name: string;
    nascimento: string;
    gfCpf: string;
    rgCertidao: string;
    pcd: string;
    parentesco: string;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const ModalGrupoFamiliar = ({ isOpen, onClose }: ModalProps) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [gfCpf, setGfCpf] = useState('')
    const [rgCertidao, setRgCertidao] = useState('')
    const [pcd, setPcd] = useState('')
    const [parentesco, setParentesco] = useState('')
    const [maiorDezoito, setMaiorDezoito] = useState(false)
    const [errors, setErrors] = useState({} as ErrorForm)
    const toast = useToast();

    const limparCampos = () => {
        setName('')
        setNascimento('')
        setGfCpf('')
        setRgCertidao('')
        setPcd('')
        setParentesco('')
        setMaiorDezoito(false)
    }

    const onClickSubmit = () => {
        const dataSend = {
            gf_nome: name,
            gf_dt_nascimento: nascimento,
            gf_cpf: gfCpf,
            gf_rg_certidao: rgCertidao,
            gf_pcd: pcd,
            gf_parentesco: parentesco
        }
        const erros = verifyErrors()
        if (Object.keys(erros).length == 0) {
            dispatch(addIntegrante(dataSend))
            limparCampos()
        }
    }

    const validDate = (dateString: string) => {
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

    const verificarCpf = (CPF: string) => {
        if (!cpf.isValid(CPF)) {
            toast({
                position: 'top',
                title: "Ocorreu um erro.",
                description: `CPF inválido`,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        } else {
            if (CPF.length === 14) {
                dispatch(postExistCpf(CPF))
                dispatch(getCpfExist(CPF))
                    .unwrap()
                    .then()
                    .catch((error) => {
                        toast({
                            position: 'top',
                            title: "Ocorreu um erro.",
                            description: `${error.message}`,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    });
            }
        }
        verifyErrors()
    }

    const verifyErrors = () => {
        setErrors({} as ErrorForm)
        const erros = {} as VerifyErrors

        if (!name) erros.name = 'Nome é obrigatório.'
        else if (name.length < 6) erros.name = 'Preencha com pelo menos 6 letras.'
        if (!nascimento) erros.nascimento = 'Data de nascimento é obrigatorio.'
        if (maiorDezoito) {
            if (gfCpf && !cpf.isValid(gfCpf)) erros.gfCpf = 'CPF inválido.'
            if (!gfCpf) { erros.gfCpf = 'CPF é obrigatório.' }
        } else {
            if (!rgCertidao) erros.rgCertidao = 'RG ou Certidão é obrigatório.'
        }
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
                                <FormControl isInvalid={!!errors.name}>
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

                                <FormControl isInvalid={!!errors.nascimento}>
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
                                        onChange={(e: InputEvent) => setNascimento(e.target.value)}
                                        onBlur={(e: InputEvent) => validDate(e.target.value)}
                                    />

                                    <FormErrorMessage>{errors.nascimento}</FormErrorMessage>
                                </FormControl>

                                {maiorDezoito &&
                                    <FormControl isInvalid={!!errors.gfCpf}>
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
                                            onChange={(e: InputEvent) => setGfCpf(e.target.value)}
                                            onBlur={(e: InputEvent) => verificarCpf(e.target.value)}

                                        />

                                        <FormErrorMessage>{errors.gfCpf}</FormErrorMessage>
                                    </FormControl>
                                }

                                {!maiorDezoito &&
                                    <FormControl isInvalid={!!errors.rgCertidao} >
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

                                <FormControl isInvalid={!!errors.pcd}>
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

                                <FormControl isInvalid={!!errors.parentesco}>
                                    <FormLabel htmlFor='cadunico'>
                                        <Box display='inline-block' mr={3}>
                                            Grau de parentesco*
                                        </Box>
                                        <Popover>
                                            <PopoverTrigger>
                                                <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverBody bg='yellow.100'>Entende-se como grupo
                                                    familiar, conforme Lei nº 12.435/2011 Art. 20. § 1º.
                                                    &quot;Para os efeitos do disposto no caput,
                                                    a família é composta pelo requerente, o cônjuge ou companheiro,
                                                    os pais e, na ausência de um deles, a madrasta ou o padrasto,
                                                    os irmãos solteiros, os filhos e enteados solteiros e os menores
                                                    tutelados, desde que vivam sob o mesmo teto.&quot;
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </FormLabel>
                                    <Flex direction='column'>
                                        <Select placeholder=' '
                                            value={parentesco}
                                            onChange={e => setParentesco(e.target.value)}
                                            onBlur={verifyErrors}
                                        >
                                            <option value='Pai/Mãe'>1. Pai/Mãe</option>
                                            <option value='Padrasto/Madrasta'>2. Padrasto/Madrasta</option>
                                            <option value='Cônjuge'>3. Esposo/Esposa</option>
                                            <option value='Companheiro/Companheira'>4. Companheiro/Companheira</option>
                                            <option value='Filho/Filha'>5. Filho/Filha</option>
                                            <option value='Enteado/Enteada'>6. Enteado/Enteada</option>
                                            <option value='Irmão/Irmã'>7. Irmão/Irmã</option>
                                            <option value='Avô/Avó'>8. Avô/Avó</option>

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
                            onClick={onClickSubmit}
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
