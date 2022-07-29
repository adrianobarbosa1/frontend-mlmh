import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input as ChakraInput,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  FormErrorMessage,
  Checkbox,
  useDisclosure,
  useColorModeValue,
  ButtonGroup,
  List,
  ListItem,
  Grid,

} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Controller, useForm } from 'react-hook-form'
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { cpf } from 'cpf-cnpj-validator';
import { BsFillTrashFill } from "react-icons/bs";

import {
  getCepAddress,
  getCpfExist,
  putRegister,
  removeIntegrante,
  selectRegister
} from "../features/register/registerSlice";
import { ModalGrupoFamiliar } from "../components/Modal/ModalGrupoFamiliar";
import { Register } from "../features/register/register.interface";
import Header from "../components/Header";
import Footer from "../components/Footer";

type InputEvent = React.ChangeEvent<HTMLInputElement>
// type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
//teste git

export default function Form() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    formState: { errors }
  } = useForm<Register>()

  const { register: registro, integrantes, status } = useAppSelector(selectRegister);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [switchOpen, setSwitchOpen] = useState(false)
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const wathGrupoFamiliar = watch('grupo_familiar')
  const wathCadunico = watch('cadunico')


  useEffect(() => {
    if (registro?.cpf) {
      const dtNascimentoDb = new Date(registro?.dt_nascimento)
      const dtNascimento = new Intl.DateTimeFormat('pt-BR').format(dtNascimentoDb)

      setValue("cpf", registro?.cpf, { shouldValidate: true })
      setValue("nome", registro?.nome, { shouldValidate: true })
      setValue("email", registro?.email, { shouldValidate: true })
      setValue("rg", registro?.rg, { shouldValidate: true })
      setValue("uf_rg", registro?.uf_rg, { shouldValidate: true })
      setValue("dt_nascimento", dtNascimento, { shouldValidate: true })
      setValue("fone_celular", registro?.fone_celular, { shouldValidate: true })
      setValue("fone_fixo", registro?.fone_fixo, { shouldValidate: true })
      setValue("sexo", registro?.sexo, { shouldValidate: true })
      setValue("portador_pcd", registro?.portador_pcd, { shouldValidate: true })
      setValue("estado_civil", registro?.estado_civil, { shouldValidate: true })
      setValue("nacionalidade", registro?.nacionalidade, { shouldValidate: true })
      setValue("cep", registro?.cep, { shouldValidate: true })
      setValue("logradouro", registro?.logradouro, { shouldValidate: true });
      setValue("quadra", registro?.quadra, { shouldValidate: true })
      setValue("lote", registro?.lote, { shouldValidate: true })
      setValue("complemento", registro?.complemento, { shouldValidate: true })
      setValue("bairro", registro?.bairro, { shouldValidate: true });
      setValue("localidade", registro?.localidade, { shouldValidate: true });
      setValue("uf", registro?.uf, { shouldValidate: true });
      setValue("reside_ano", registro?.reside_ano, { shouldValidate: true })
      setValue("renda_bruta", registro?.renda_bruta, { shouldValidate: true })
      setValue("cadunico", registro?.cadunico, { shouldValidate: true })
      setValue("numero_cadunico", registro?.numero_cadunico, { shouldValidate: true })
      setValue("possui_imovel", registro?.possui_imovel, { shouldValidate: true })
      setValue("contemplado_habitacional", registro?.contemplado_habitacional, { shouldValidate: true })
      setValue("comprador_imovel", registro?.comprador_imovel, { shouldValidate: true })
      setValue("arrimo_familia", registro?.arrimo_familia, { shouldValidate: true })
      setValue("vitima_violencia", registro?.vitima_violencia, { shouldValidate: true })
      setValue("grupo_familiar", registro?.grupo_familiar, { shouldValidate: true })
    } else {
      toast({
        position: 'top',
        title: "Ocorreu um erro.",
        description: `Por favor Entre com o seu número de protocolo`,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }, [registro, setValue])

  function handleCep(e: InputEvent) {
    const cep = e.target.value;
    if (e.target.value?.length === 9) {
      dispatch(getCepAddress(cep));
    }
  }

  const onBlurCpf = (e: InputEvent) => {
    const CPF = e.target.value
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
      if (e.target.value?.length === 14) {
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
  }

  const onSubmit = (data: Register) => {
    data.integrantes = integrantes
    data.dt_nascimento = data.dt_nascimento.split('/').reverse().join('-');
    data.protocolo = registro?.protocolo

    dispatch(putRegister(data))
      .unwrap()
      .then((result) => {
        router.push("/protocoloupdate");
      })
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

  const onClickDelete = (integrante: string) => {
    dispatch(removeIntegrante(integrante))
  }

  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Header />
      <Flex
        w='100%'
        px={{ base: '0', md: '4' }}
        my='6'
      >
        <Box
          as='form'
          onSubmit={handleSubmit(onSubmit)}
          flex='1'
          bg='#fff'
          p={{ base: '2', md: '8' }}
          boxShadow='dark-lg'
          rounded='xl'
        >

          <Divider my='6' borderColor='blueOficial' />

          <Heading
            fontWeight='bold'
            color='text'
            size='md'
            textAlign='center'
            mb='2rem'
          >
            Dados pessoais
          </Heading>


          <VStack spacing={4}>
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.cpf}>
                <FormLabel htmlFor='cpf'>
                  <Box display='inline-block' mr={3}>
                    CPF*
                  </Box>

                </FormLabel>
                <Controller
                  name='cpf'
                  defaultValue=''
                  control={control}
                  rules={{
                    required: 'CPF é obrigatorio',
                    validate: value => cpf.isValid(value) || 'cpf inválido'
                  }}
                  render={({ field }) => <NumberFormat
                    {...field}
                    customInput={ChakraInput}
                    onBlur={(e: InputEvent) => onBlurCpf(e)}
                    bgColor='gray.50'
                    format='###.###.###-##'
                  />}
                />
                <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.nome} >
                <FormLabel htmlFor='nome'>
                  <Box display='inline-block' mr={3}>
                    Nome Completo*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("nome", { required: "Nome é obrigatório." })}
                />
                <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email} >
                <FormLabel htmlFor='email'>
                  <Box display='inline-block' mr={3}>
                    E-mail*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("email", {
                    required: "E-mail é obrigatório.",
                    pattern: {
                      value:
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Insira um e-mail válido.",
                    }
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.rg} >
                <FormLabel htmlFor='rg'>
                  <Box display='inline-block' mr={3}>
                    RG*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("rg", { required: "RG é obrigatório." })}
                />
                <FormErrorMessage>{errors.rg?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.uf_rg} >
                <FormLabel htmlFor='uf_rg'>
                  <Box display='inline-block' mr={3}>
                    UF RG*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("uf_rg", { required: "RG é obrigatório." })}
                />
                <FormErrorMessage>{errors.uf_rg?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.dt_nascimento}>
                <FormLabel htmlFor='dt_nascimento'>
                  <Box display='inline-block' mr={3}>
                    Data de nascimento*
                  </Box>

                </FormLabel>
                <Controller
                  name='dt_nascimento'
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
                <FormErrorMessage>{errors.dt_nascimento?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fone_celular}>
                <FormLabel htmlFor='fone_celular'>
                  <Box display='inline-block' mr={3}>
                    Whatsapp*
                  </Box>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody bg='yellow.100'>Para possibilitar contato de visita.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <Controller
                  name='fone_celular'
                  defaultValue=''
                  control={control}
                  rules={{
                    required: 'Celular é obrigatorio',
                    //talvez voltar para validar data
                  }}
                  render={({ field }) => <NumberFormat
                    {...field}
                    customInput={ChakraInput}
                    bgColor='gray.50'
                    format='(##)#-####-####'
                  />}
                />
                <FormErrorMessage>{errors.fone_celular?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.fone_fixo}>
                <FormLabel htmlFor='fone_fixo'>
                  <Box display='inline-block' mr={3}>
                    Telefone Fixo
                  </Box>

                </FormLabel>
                <Controller
                  name='fone_fixo'
                  defaultValue=''
                  control={control}
                  render={({ field }) => <NumberFormat
                    {...field}
                    customInput={ChakraInput}
                    bgColor='gray.50'
                    format='(##)####-####'
                  />}
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
            >
              <FormControl isInvalid={!!errors.sexo}>
                <Flex direction='column'>
                  <FormLabel htmlFor='sexo'>
                    <Box display='inline-block' mr={3}>
                      sexo*
                    </Box>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("sexo", { required: "Campo obrigatório." })}>
                    <option value={'MASCULINO'}>Masculino</option>
                    <option value={'FEMININO'}>Feminino</option>

                  </Select>
                  <FormErrorMessage>{errors.sexo?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.portador_pcd}>
                <Flex direction='column'>
                  <FormLabel htmlFor='portador_pcd'>
                    <Box display='inline-block' mr={3}>
                      Portador de deficiência?*
                    </Box>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("portador_pcd", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.portador_pcd?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.estado_civil}>
                <Flex direction='column'>
                  <FormLabel htmlFor='portador_pcd'>
                    <Box display='inline-block' mr={3}>
                      Estado Civil*
                    </Box>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("estado_civil", { required: "Estado civil é obrigatório." })}>
                    <option value='solteiro'>1. Solteiro</option>
                    <option value='solteiro'>2. União estavel</option>
                    <option value='casado'>3. Casado</option>
                    <option value='separado'>4. Separado</option>
                    <option value='divorciado'>5. Divorciado</option>
                    <option value='viuvo'>6. Viúvo</option>

                  </Select>
                  <FormErrorMessage>{errors.estado_civil?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.nacionalidade}>
                <Flex direction='column'>
                  <FormLabel htmlFor='portador_pcd'>
                    <Box display='inline-block' mr={3}>
                      Nacionalidade*
                    </Box>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("nacionalidade", { required: "Nacionalidade é obrigatório." })}>
                    <option value='brasileiro'>Brasileiro</option>
                    <option value='estrangeiro'>Estrangeiro</option>
                  </Select>
                  <FormErrorMessage>{errors.nacionalidade?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>
          </VStack>

          <Divider mt='4rem' mb='6' borderColor='blueOficial' />
          <Heading
            fontWeight='bold'
            color='text'
            size='md'
            textAlign='center'
          >
            Dados do endereço
          </Heading>

          <VStack spacing={6}>
            <SimpleGrid minChildWidth='240px' mt={2} spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.cep}>
                <FormLabel htmlFor='cep'>
                  <Box display='inline-block' mr={3}>
                    CEP*
                  </Box>

                </FormLabel>
                <Controller
                  name='cep'
                  defaultValue=''
                  control={control}
                  rules={{
                    required: 'CEP é obrigatorio',
                    //talvez voltar para validar data
                  }}
                  render={({ field }) => <NumberFormat
                    {...field}
                    customInput={ChakraInput}
                    bgColor='gray.50'
                    format='#####-###'
                    onBlur={(e: InputEvent) => handleCep(e)}
                  />}
                />
                <FormErrorMessage>{errors.cep?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.logradouro} >
                <FormLabel htmlFor='logradouro'>
                  <Box display='inline-block' mr={3}>
                    Endereço (“Rua, Avenida,etc”)*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("logradouro", { required: "Campo obrigatório." })}
                />
                <FormErrorMessage>{errors.logradouro?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.quadra} >
                <FormLabel htmlFor='quadra'>
                  <Box display='inline-block' mr={3}>
                    Quadra
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("quadra")}
                />
                <FormErrorMessage>{errors.quadra?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lote} >
                <FormLabel htmlFor='lote'>
                  <Box display='inline-block' mr={3}>
                    Lote
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("lote")}
                />
                <FormErrorMessage>{!!errors.lote?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.complemento} >
                <FormLabel htmlFor='Complemento'>
                  <Box display='inline-block' mr={3}>
                    Complemento
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("complemento")}
                />
                <FormErrorMessage>{errors.complemento?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.bairro} >
                <FormLabel htmlFor='bairro'>
                  <Box display='inline-block' mr={3}>
                    Bairro*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("bairro", { required: "Bairro é obrigatório." })}
                />
                <FormErrorMessage>{errors.bairro?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.localidade} >
                <FormLabel htmlFor='localidade'>
                  <Box display='inline-block' mr={3}>
                    Cidade*
                  </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                  {...register("localidade", { required: "Municipio é obrigatório." })}
                />
                <FormErrorMessage>{errors.localidade?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.uf}>
                <Flex direction='column'>
                  <FormLabel htmlFor='uf'>
                    <Box display='inline-block' mr={3}>
                      UF*
                    </Box>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("uf", { required: "Estado civil é obrigatório." })}>
                    <option value={'AC'}>AC</option>
                    <option value={'AL'}>AL</option>
                    <option value={'AP'}>AP</option>
                    <option value={'AM'}>AM</option>
                    <option value={'BA'}>BA</option>
                    <option value={'CE'}>CE</option>
                    <option value={'DF'}>DF</option>
                    <option value={'ES'}>ES</option>
                    <option value={'GO'}>GO</option>
                    <option value={'MA'}>MA</option>
                    <option value={'MT'}>MT</option>
                    <option value={'MS'}>MS</option>
                    <option value={'MG'}>MG</option>
                    <option value={'PA'}>PA</option>
                    <option value={'PB'}>PB</option>
                    <option value={'PR'}>PR</option>
                    <option value={'PE'}>PE</option>
                    <option value={'PI'}>PI</option>
                    <option value={'RJ'}>RJ</option>
                    <option value={'RN'}>RN</option>
                    <option value={'RS'}>RS</option>
                    <option value={'RO'}>RO</option>
                    <option value={'RR'}>RR</option>
                    <option value={'SC'}>SC</option>
                    <option value={'SP'}>SP</option>
                    <option value={'SE'}>SE</option>
                    <option value={'TO'}>TO</option>
                  </Select>
                  <FormErrorMessage>{errors.uf?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>

            <Divider my='6' borderColor='blueOficial' />

            <Heading
              fontWeight='bold'
              color='text'
              size='md'
              textAlign='center'
              mb='2rem'
            >
              Dados do Grupo Familiar
            </Heading>

            <Flex>
              <Text mr={2}>Para mais informações dos dados abaixo clique no icone de ajuda correspondente ao seu campo</Text>
              <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
            </Flex>


            <Flex direction='column' w='100%' >
              <FormControl isInvalid={!!errors.reside_ano} >
                <FormLabel htmlFor='reside_ano'>
                  <Box display='inline-block' mr={3}>
                    Quanto tempo reside em Anápolis?*
                  </Box>
                </FormLabel>
                <Flex>
                  <ChakraInput
                    bgColor='gray.50'
                    type='number'
                    maxW='100px'
                    {...register("reside_ano", { required: "Tempo de residencia é obrigatório." })}
                  />
                  <Text ml={2} mt={2}>Ano(s)</Text>
                </Flex>
                <FormErrorMessage>{errors.reside_ano?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex w='100%'>
              <FormControl isInvalid={!!errors.renda_bruta}>
                <FormLabel htmlFor='renda_bruta'>
                  <Box display='inline-block' mr={3}>
                    Renda bruta familiar*
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
                  name='renda_bruta'
                  defaultValue=''
                  control={control}
                  rules={{ required: 'Renda bruta é obrigatorio' }}
                  render={({ field }) => <NumberFormat
                    {...field}
                    customInput={ChakraInput}
                    maxW='360px'
                    bgColor='gray.50'
                    thousandSeparator='.'
                    prefix="R$"
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />}
                />
                <FormErrorMessage>{errors.renda_bruta?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
            // sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <FormControl isInvalid={!!errors.cadunico}>
                <Flex direction='column'>
                  <FormLabel htmlFor='cadunico'>
                    <Box display='inline-block' mr={3}>
                      Possui CAD. ÚNICO?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>O Cadastro Único é um conjunto de informações sobre as famílias
                          brasileiras em situação de pobreza e extrema pobreza. O CadÚnico que possibilita o
                          cidadão em participação de programas sociais ex.: Auxilio Brasil (Bolsa Família), Tarifa
                          Social de Energia Elétrica, Isenção em Concurso Público e outros. O CADÚNCO deve
                          estar ativo e atualizado. Devendo o responsável familiar atualiza-lo de 02 (dois) em 02
                          (dois) anos.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("cadunico", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.portador_pcd?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              {wathCadunico == 'sim' &&


                <FormControl isInvalid={!!errors.numero_cadunico} >
                  <FormLabel htmlFor='numero_cadunico'>
                    <Box display='inline-block' mr={3}>
                      Número do NIS*?
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>Número de Identificação Social(NIS) é um número de cadastro é
                          atribuído apenas para fins de identificação aos cidadãos que tenham ou possam vir a ter
                          direito a benefícios sociais. É gerado um número de NIS para cada pessoa do grupo
                          familiar que esteja inscrito no CADÙNICO esse número é encontrado na folha espelho
                          do CADÚNICO e/ou no cartão do benefício social. O número de NIS a ser inserido neste
                          campo é o do requerente.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>

                  <ChakraInput bgColor='gray.50' type='number'
                    {...register("numero_cadunico", { required: "Número NIS é obrigatório." })}
                  />
                  <FormErrorMessage>{errors.numero_cadunico?.message}</FormErrorMessage>
                </FormControl>
              }
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.possui_imovel}>
                <Flex direction='column'>
                  <FormLabel htmlFor='possui_imovel'>
                    <Box display='inline-block' mr={3}>
                      Algum membro do grupo familiar possui ou possuiu imóvel nos últimos
                      12 meses?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>Possuidores ou Proprietário de outro imóvel urbano ou
                          rural nos últimos 12 meses.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("possui_imovel", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.possui_imovel?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <FormControl isInvalid={!!errors.contemplado_habitacional}>
                <Flex direction='column'>
                  <FormLabel htmlFor='contemplado_habitacional'>
                    <Box display='inline-block' mr={3}>
                      Algum membro do grupo familiar já foi contemplado por programa Habitacional
                      em qualquer município do país?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>O requerente ou algum membro do grupo familiar já
                          recebeu algum imóvel (unidade habitacional) de programas habitacionais.
                          Ex.: Minha Casa Minha Vida.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("contemplado_habitacional", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.contemplado_habitacional?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.comprador_imovel}>
                <Flex direction='column'>
                  <FormLabel htmlFor='comprador_imovel'>
                    <Box display='inline-block' mr={3}>
                      Possui membro do grupo familiar promitente comprador de qualquer imóvel
                      residencial?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>O requerente ou algum membro do grupo familiar possui
                          algum imóvel residencial financiado no âmbito do Sistema Financeiro de
                          Habitação.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("comprador_imovel", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.comprador_imovel?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
            >
              <FormControl isInvalid={!!errors.arrimo_familia}>
                <Flex direction='column'>
                  <FormLabel htmlFor='arrimo_familia'>
                    <Box display='inline-block' mr={3}>
                      Mulher arrimo de família?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>Mulher que é a principal fonte de renda da família.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("arrimo_familia", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.arrimo_familia?.message}</FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.vitima_violencia}>
                <Flex direction='column'>
                  <FormLabel htmlFor='vitima_violencia'>
                    <Box display='inline-block' mr={3}>
                      Vítima de violência doméstica?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>De acordo com art. 5º da Lei Maria da Penha, violência doméstica e
                          familiar contra a mulher é” qualquer ação ou missão baseada no gênero que cause
                          morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial”. Serão
                          exigidos os seguintes documentos comprobatórios de violência doméstica: Cópia de
                          inquérito policial; denúncia – Ação Penal; pedido de medida protetiva;
                          sentença condenatória com data até o momento da inscrição.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("vitima_violencia", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.vitima_violencia?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>

            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
            >
              <FormControl isInvalid={!!errors.grupo_familiar}>
                <Flex direction='column'>
                  <FormLabel htmlFor='grupo_familiar'>
                    <Box display='inline-block' mr={3}>
                      O grupo familiar possui mais de um integrante?*
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody bg='yellow.100'>O grupo familiar será composto pelo requerente, o cônjuge ou
                          companheiro, os pais e, na ausência de um deles, a madrasta ou o padrasto, os irmãos
                          solteiros, os filhos e enteados solteiros e os menores tutelados, desde que vivam sob o
                          mesmo teto.</PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormLabel>
                  <Select
                    placeholder=' '
                    {...register("grupo_familiar", { required: "Campo obrigatório." })}>
                    <option value={'sim'}>Sim</option>
                    <option value={'nao'}>Não</option>

                  </Select>
                  <FormErrorMessage>{errors.grupo_familiar?.message}</FormErrorMessage>
                </Flex>
              </FormControl>
            </SimpleGrid>

            <Divider my='6' borderColor='blueOficial' />

            {wathGrupoFamiliar == 'sim' &&

              <>
                <Flex>
                  <Button
                    ml={4}
                    colorScheme='blue'
                    onClick={onOpen}
                  >
                    + Adicionar integrante ao grupo familiar
                  </Button>
                </Flex>

                <ModalGrupoFamiliar
                  isOpen={isOpen}
                  onClose={onClose}
                />

                <Flex justify='center' >
                  <Grid templateColumns={{ base: 'repeat(1, 3fr)', md: 'repeat(4, 2fr)' }} gap={6} maxWidth='1030px'>


                    {integrantes.map((item, index) => {
                      return (

                        <Flex key={index}
                          maxW={{ base: '330px', md: '230px' }}
                          bg='gray.800'
                          borderWidth="1px"
                          rounded="lg"
                          shadow="lg"
                          textAlign='center'
                        >


                          <Box w='100%' h='100%' bg='blue.100' px={2} py={10}
                            fontSize={'sm'}>
                            <Heading as='h6' size='xs' mb={4} color={'blue.500'}>
                              Integrante {index + 1}
                            </Heading>
                            <List spacing={3}>
                              <ListItem >
                                <Heading as='h6' size='xs' color={'blue.500'}>
                                  Nome:
                                </Heading>
                                {item.gf_nome}
                              </ListItem>
                              <ListItem>
                                <Heading as='h6' size='xs' color={'blue.500'}>
                                  Data de nascimento:
                                </Heading>
                                {item.gf_dt_nascimento}
                              </ListItem>

                              {item.gf_cpf !== undefined &&
                                <ListItem>
                                  <Heading as='h6' size='xs' color={'blue.500'}>
                                    CPF:
                                  </Heading>
                                  {item.gf_cpf}
                                </ListItem>
                              }

                              {item.gf_rg_certidao !== undefined &&

                                <ListItem>
                                  <Heading as='h6' size='xs' color={'blue.500'}>
                                    RG/ Certidão:
                                  </Heading>
                                  {item.gf_rg_certidao}
                                </ListItem>
                              }

                              <ListItem>
                                <Heading as='h6' size='xs' color={'blue.500'}>
                                  PCD:
                                </Heading>
                                {item.gf_pcd}
                              </ListItem>
                              <ListItem>
                                <Heading as='h6' size='xs' color={'blue.500'}>
                                  Parentesco:
                                </Heading>
                                {item.gf_parentesco}
                              </ListItem>
                            </List>


                            <Flex justify='center' mt={8}>
                              <ButtonGroup variant="solid" size="sm" spacing={3}>

                                <IconButton
                                  colorScheme="red"
                                  icon={<BsFillTrashFill />}
                                  aria-label="Delete"
                                  onClick={() => onClickDelete(item.integrante)}
                                />
                              </ButtonGroup>
                            </Flex>
                          </Box>
                        </Flex>
                      )
                    })}
                  </Grid >
                </Flex>

              </>
            }


            <Divider my={6} py={6} borderColor='blueOficial' />

            <Box mt={8}>
              <Checkbox size='md' onChange={() => setSwitchOpen(!switchOpen)}>Declaro para todos os fins que, todas as informações aqui
                prestadas são verdadeiras e estão corretas, sob pena do art. 297 do Código Penal Brasileiro.</Checkbox>
            </Box>

            {switchOpen ? (
              <Button
                type='submit'
                isLoading={status === 'loading'}
                mb="16px"
                bg='yellowOficial'
                color='text'
                fontSize="xs"
                variant="no-effects"
                px="30px"
              >
                Atualizar
              </Button>
            ) : ''}

          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  )
}
