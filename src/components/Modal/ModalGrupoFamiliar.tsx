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
import { Control, Controller, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import NumberFormat from "react-number-format";
import { cpf } from 'cpf-cnpj-validator';

interface ModalProps<TFieldValues extends FieldValues = FieldValues, TContext = any> {
    isOpen: boolean;
    onClose: () => void;
    errors: FieldErrors<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    control: Control<TFieldValues, TContext>;
}

export const ModalGrupoFamiliar = ({ isOpen, onClose, errors, register, control }: ModalProps) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as='form'>
                    <ModalHeader>Cadastro de integrante no grupo familiar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing='4'>
                            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
                                <FormControl isInvalid={errors.gf_nome} >
                                    <FormLabel htmlFor='gf_nome'>
                                        <Box display='inline-block' mr={3}>
                                            Nome Completo*
                                        </Box>
                                    </FormLabel>
                                    <ChakraInput bgColor='gray.50'
                                        {...register("gf_nome", { required: "Nome é obrigatório." })}
                                    />
                                    <FormErrorMessage>{errors.gf_nome?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_dt_nascimento}>
                                    <FormLabel htmlFor='gf_dt_nascimento'>
                                        <Box display='inline-block' mr={3}>
                                            Data de nascimento*
                                        </Box>

                                    </FormLabel>
                                    <Controller
                                        name='gf_dt_nascimento'
                                        defaultValue=''
                                        control={control}
                                        rules={{
                                            required: 'Data de nascimento é obrigatorio',
                                            //talvez voltar para validar data
                                        }}
                                        render={({ field }) => <NumberFormat
                                            {...field}
                                            customInput={ChakraInput}
                                            bgColor='gray.50'
                                            format='##/##/####'
                                        />}
                                    />
                                    <FormErrorMessage>{errors.gf_dt_nascimento?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_cpf}>
                                    <FormLabel htmlFor='gf_cpf'>
                                        <Box display='inline-block' mr={3}>
                                            CPF*
                                        </Box>

                                    </FormLabel>
                                    <Controller
                                        name='gf_cpf'
                                        defaultValue=''
                                        control={control}
                                        rules={{
                                            required: 'CPF é obrigatorio',
                                            validate: value => cpf.isValid(value) || 'cpf inválido'
                                        }}
                                        render={({ field }) => <NumberFormat
                                            {...field}
                                            customInput={ChakraInput}
                                            bgColor='gray.50'
                                            format='###.###.###-##'
                                        />}
                                    />
                                    <FormErrorMessage>{errors.gf_cpf?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_rg_certidao} >
                                    <FormLabel htmlFor='gf_rg_certidao'>
                                        <Box display='inline-block' mr={3}>
                                            RG ou Certidão de nascimento*
                                        </Box>
                                    </FormLabel>
                                    <ChakraInput bgColor='gray.50'
                                        {...register("gf_rg_certidao", { required: "RG é obrigatório." })}
                                    />
                                    <FormErrorMessage>{errors.gf_rg_certidao?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_renda_bruta}>
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
                                    <Controller
                                        name='gf_renda_bruta'
                                        defaultValue=''
                                        control={control}
                                        rules={{ required: 'Renda bruta é obrigatorio' }}
                                        render={({ field }) => <NumberFormat
                                            {...field}
                                            customInput={ChakraInput}
                                            bgColor='gray.50'
                                            thousandSeparator='.'
                                            prefix="R$"
                                            decimalSeparator=','
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                        />}
                                    />
                                    <FormErrorMessage>{errors.gf_renda_bruta?.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_pcd}>
                                    <Flex direction='column'>
                                        <FormLabel as='legend'>Portador de deficiência?*</FormLabel>
                                        <RadioGroup name='gf_portador_pcd'>
                                            <HStack spacing='24px'>
                                                <Radio value='sim' type="radio"
                                                    {...register("gf_portador_pcd", { required: 'O campo portador de deficiência é obrigatório' })}>Sim</Radio>
                                                <Radio value='nao' type="radio"
                                                    {...register("gf_portador_pcd", { required: 'O campo portador de deficiência é obrigatório' })}>Não</Radio>
                                            </HStack>
                                        </RadioGroup>
                                        <FormErrorMessage>{errors.gf_portador_pcd?.message}</FormErrorMessage>
                                    </Flex>
                                </FormControl>

                                <FormControl isInvalid={errors.gf_parentesco}>
                                    <Flex direction='column'>
                                        <Select
                                            placeholder='Parentesco*'
                                            {...register("gf_parentesco", { required: "Estado civil é obrigatório." })}>
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
                                        <FormErrorMessage>{errors.gf_parentesco?.message}</FormErrorMessage>
                                    </Flex>
                                </FormControl>

                            </SimpleGrid>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            type='submit'
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
