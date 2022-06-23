import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
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
  PopoverHeader,
  PopoverBody,
  FormErrorMessage,
  Checkbox
} from "@chakra-ui/react";
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Form/Input";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCepAddress, postRegister, registerUser, selectRegister } from "../components/features/register/registerSlice";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import protocolo from "./protocolo";
import { MaskedInput } from "../components/Form/MaskedInput";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { cpf } from 'cpf-cnpj-validator';
import { info } from "console";

export default function Form() {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState,
    formState: { errors }
  } = useForm({})

  const { register: registro } = useAppSelector(selectRegister);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (registro?.logradouro) {
      setValue("logradouro", registro.logradouro, { shouldValidate: true });
      setValue("bairro", registro.bairro, { shouldValidate: true });
      setValue("municipio", registro.localidade, { shouldValidate: true });
      setValue("uf", registro.uf, { shouldValidate: true });
    }
  }, [registro])

  const handleCep = (e) => {
    const cep = e.target.value;
    if (e.target.value?.length === 9) {
      dispatch(getCepAddress(cep))
    }
  }

  const wathGrupoFamiliar = watch('grupo_familiar')
  const wathCadunico = watch('cadunico')
  const wathGfQuantidade = watch('gf_quantidade')
  const wathGfCpfCertidao = watch('gf_cpf_certidao')

  const onSubmit = data => {
    console.log(data)
    data.dt_nascimento = data.dt_nascimento.split('/').reverse().join('-');

    dispatch(postRegister(data))
      .unwrap()
      .then((result) => {
        dispatch(registerUser(result.data.protocolo));
        router.push("/protocolo");
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

  let inputArray = []
  {
    for (var i = 0; i <= wathGfQuantidade - 1; i++) {
      inputArray.push((
        <Flex key={wathGfQuantidade + i} direction='column' w='100%'>
          <Divider mt='4rem' mb='6' borderColor='blueOficial' />
          <Heading

            fontWeight='bold'
            color='text'
            size='md'
            textAlign='center'
            mb='2rem'
          >
            Pessoa {i + 1}
          </Heading>
          <SimpleGrid minChildWidth='300px' spacing='4' w='100%'>

            <Flex direction='column' mt='2rem'>
              <Select
                placeholder='CPF ou Certidão de nascimento'
                {...register("gf_cpf_certidao")}>
                <option value='cpf'>1. CPF</option>
                <option value='certidao'>2. Certidão de nascimento</option>

              </Select>
              <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.gf_cpf_certidao?.message}</Text>
            </Flex>

            {wathGfCpfCertidao == 'cpf' &&
              <Controller
                name="gf_cpf"
                defaultValue=''
                control={control}
                render={({ field }) =>
                  <MaskedInput
                    {...field}
                    error={errors.gf_cpf}
                    label='CPF'
                    mask="###.###.###-##"
                  />}
              />
            }

            {wathGfCpfCertidao == 'certidao' &&
              <Input
                error={errors.gf_certidao}
                label='Certidão de nascimento*'
                {...register("gf_certidao")}
              />
            }

            <Input
              error={errors.gf_nome}
              label='Nome completo*'
              {...register("gf_nome")} />


            <Controller
              name="gf_dt_nascimento"
              defaultValue=''
              control={control}
              render={({ field }) => <MaskedInput
                {...field}
                error={errors.gf_dt_nascimento}
                label='Data de nascimento*'
                mask="##/##/####"
              />}
            />

            <Input
              error={errors.gf_grau_parentesco}
              label='Grau de parentesco*'
              {...register("gf_grau_parentesco")} />
          </SimpleGrid>
        </Flex>)
      )
    }
  }

  return (
    <Flex
      w='100%'
      maxWidth={1480}
      ml={{ base: '0.1rem' }}
      px={{ base: '0', md: '6' }}
      my='6'
      pt='5rem'
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


        <VStack spacing='4'>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            {/* <Input
              error={errors.nome}
              explication={true}
              popHeader='nome'
              popBody='teste'
              label='Nome Completo*'
              {...register("nome", { required: "Nome é obrigatório." })}
            /> */}
            <FormControl isInvalid={errors.nome} >
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

            <FormControl isInvalid={errors.email} >
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

            <FormControl isInvalid={errors.cpf}>
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
                  bgColor='gray.50'
                  format='###.###.###-##'
                />}
              />
              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>

            <FormControl isInvalid={errors.rg} >
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

            <FormControl isInvalid={errors.uf_rg} >
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

            <FormControl isInvalid={errors.dt_nascimento}>
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

            <FormControl isInvalid={errors.fone_celular}>
              <FormLabel htmlFor='fone_celular'>
                <Box display='inline-block' mr={3}>
                  Celular*
                </Box>

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

            <FormControl isInvalid={errors.fone_fixo}>
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

          <FormControl isInvalid={errors.sexo}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <Flex direction='column'>
                <FormLabel as='legend'>Sexo<Text as='span' color='red'>*</Text></FormLabel>
                <RadioGroup name='sexo'>
                  <HStack spacing='24px'>
                    <Radio value='masculino' type="radio"
                      {...register("sexo", { required: 'O campo sexo é obrigatório' })}>Masculino</Radio>
                    <Radio value='feminino' type="radio"
                      {...register("sexo", { required: 'O campo sexo é obrigatório' })}>Feminino</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.sexo?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Flex direction='column'>
              <Select
                placeholder='Estado Civil*'
                {...register("estado_civil")}>
                <option value='solteiro'>1. Solteiro</option>
                <option value='casado'>2. Casado</option>
                <option value='separado'>3. Separado</option>
                <option value='divorciado'>4. Divorciado</option>
                <option value='viuvo'>5. Viúvo</option>

              </Select>
              <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.estado_civil?.message}</Text>
            </Flex>

            <Flex direction='column'>
              <Select
                placeholder='Nacionalidade*'
                {...register("nacionalidade")}>
                <option value='nato'>Brasileiro nato</option>
                <option value='naturalizado'>Brasileiro naturalizado</option>
                <option value='estrangeiro'>Estrangeiro</option>
              </Select>
              <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.nacionalidade?.message}</Text>
            </Flex>
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

        <VStack spacing='4'>
          <SimpleGrid minChildWidth='240px' mt={2} spacing='4' w='100%'>
            <FormControl isInvalid={errors.cep}>
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
                  onBlur={(e) => handleCep(e)}
                />}
              />
              <FormErrorMessage>{errors.cep?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.logradouro} >
              <FormLabel htmlFor='logradouro'>
                <Box display='inline-block' mr={3}>
                  Endereço (“Rua, Avenida,etc”)*
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50'
                {...register("logradouro", { required: "Logradouro é obrigatório." })}
              />
              <FormErrorMessage>{errors.logradouro?.message}</FormErrorMessage>
            </FormControl>




          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <FormControl isInvalid={errors.quadra} >
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

            <FormControl isInvalid={errors.lote} >
              <FormLabel htmlFor='lote'>
                <Box display='inline-block' mr={3}>
                  Lote
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50'
                {...register("lote")}
              />
              <FormErrorMessage>{errors.lote?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.Complemento} >
              <FormLabel htmlFor='Complemento'>
                <Box display='inline-block' mr={3}>
                  Complemento
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50'
                {...register("Complemento")}
              />
              <FormErrorMessage>{errors.Complemento?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <FormControl isInvalid={errors.bairro} >
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

            <FormControl isInvalid={errors.municipio} >
              <FormLabel htmlFor='municipio'>
                <Box display='inline-block' mr={3}>
                  Estado* COMBO BOX
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50'
                {...register("municipio", { required: "Municipio é obrigatório." })}
              />
              <FormErrorMessage>{errors.municipio?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.uf} >
              <FormLabel htmlFor='uf'>
                <Box display='inline-block' mr={3}>
                  UF*
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50'
                {...register("uf", { required: "UF é obrigatório." })}
              />
              <FormErrorMessage>{errors.uf?.message}</FormErrorMessage>
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
            <Text mr={2}>Para mais informações dos dados abaixo clique no icone de correspondente ao seu campo</Text>
            <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
          </Flex>


          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <FormControl isInvalid={errors.tempo_reside} >
              <FormLabel htmlFor='tempo_reside'>
                <Box display='inline-block' mr={3}>
                  Quanto tempo reside em Anápolis(anos)?*
                </Box>
              </FormLabel>
              <ChakraInput bgColor='gray.50' type='number'
                {...register("tempo_reside", { required: "Tempo de residencia é obrigatório." })}
              />
              <FormErrorMessage>{errors.tempo_reside?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.renda_bruta}>
              <FormLabel htmlFor='renda_bruta'>
                <Box display='inline-block' mr={3}>
                  Renda bruta familiar
                </Box>
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>Considera-se renda familiar o somatório da renda
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
          </SimpleGrid>

          <FormControl isInvalid={errors.cadunico}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

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
                      <PopoverBody>O Cadastro Único é um conjunto de informações sobre as famílias
                        brasileiras em situação de pobreza e extrema pobreza. O CadÚnico que possibilita o
                        cidadão em participação de programas sociais ex.: Auxilio Brasil (Bolsa Família), Tarifa
                        Social de Energia Elétrica, Isenção em Concurso Público e outros. O CADÚNCO deve
                        estar ativo e atualizado. Devendo o responsável familiar atualiza-lo de 02 (dois) em 02
                        (dois) anos.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <RadioGroup name='cadunico'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("cadunico", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("cadunico", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.cadunico?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          {wathCadunico == 'sim' &&
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>

              <FormControl isInvalid={errors.numero_cadunico} >
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
                      <PopoverBody>Número de Identificação Social(NIS) é um número de cadastro é
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
            </SimpleGrid>}



          <FormControl isInvalid={errors.pcd}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <Flex direction='column'>
                <FormLabel htmlFor='pcd'>
                  <Box display='inline-block' mr={3}>
                    Grupo familiar possui PCD?*
                  </Box>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>Considera-se pessoa com deficiência(PCD) aquela que tem
                        impedimento de longo prazo de natureza física, mental, intelectual ou
                        sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir
                        sua participação plena e efetiva na sociedade em igualdade de condições
                        com as demais pessoas. A comprovação da deficiência alegada se dará
                        mediante o upload de laudo médico, atualizado, com data máxima de 12
                        (meses) de expedição, no momento da inscrição, o qual deverá conter a
                        Classificação Internacional de Doenças (CID).</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='pcd'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("pcd", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("pcd", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.pcd?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <FormControl isInvalid={errors.possui_imovel}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

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
                      <PopoverBody>Possuidores ou Proprietário de outro imóvel urbano ou
                        rural nos últimos 12 meses.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='possui_imovel'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("possui_imovel", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("possui_imovel", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.possui_imovel?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <FormControl isInvalid={errors.contemplado_habitacional}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
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
                      <PopoverBody>O requerente ou algum membro do grupo familiar já
                        recebeu algum imóvel (unidade habitacional) de programas habitacionais.
                        Ex.: Minha Casa Minha Vida.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='contemplado_habitacional'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("contemplado_habitacional", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("contemplado_habitacional", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.contemplado_habitacional?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <FormControl isInvalid={errors.comprador_imovel}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

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
                      <PopoverBody>O requerente ou algum membro do grupo familiar possui
                        algum imóvel residencial financiado no âmbito do Sistema Financeiro de
                        Habitação.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='comprador_imovel'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("comprador_imovel", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("comprador_imovel", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.comprador_imovel?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <FormControl isInvalid={errors.arrimo_familia}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

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
                      <PopoverBody>Mulher que é a principal fonte de renda da família</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='arrimo_familia'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("arrimo_familia", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("arrimo_familia", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.arrimo_familia?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>

          <FormControl isInvalid={errors.vitima_violencia}>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

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
                      <PopoverBody>De acordo com art. 5º da Lei Maria da Penha, violência doméstica e
                        familiar contra a mulher é” qualquer ação ou missão baseada no gênero que cause
                        morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial”. Serão
                        exigidos os seguintes documentos comprobatórios de violência doméstica: Cópia de
                        inquérito policial; denúncia – Ação Penal; pedido de medida protetiva;
                        sentença condenatória com data até o momento da inscrição.</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </FormLabel>

                <RadioGroup name='vitima_violencia'>
                  <HStack spacing='24px'>
                    <Radio value='sim' type="radio"
                      {...register("vitima_violencia", { required: 'Campo obrigatório' })}>Sim</Radio>
                    <Radio value='nao' type="radio"
                      {...register("vitima_violencia", { required: 'Campo obrigatório' })}>Não</Radio>
                  </HStack>
                </RadioGroup>
                <FormErrorMessage>{errors.vitima_violencia?.message}</FormErrorMessage>
              </Flex>

            </SimpleGrid>
          </FormControl>




          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Select
              placeholder='Quantidade de Pessoas no Grupo Familiar?*'
              {...register("gf_quantidade")}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>

            </Select>
          </SimpleGrid>

          {/* <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>

            <Select
              placeholder='Número de pessoas no Grupo familiar?*'
              {...register("grupo_familiar")}
            >
              <option value={0}>Não possui grupo familiar</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>

            </Select>
          </SimpleGrid> */}

          {wathGfQuantidade && inputArray}

          <Checkbox>Declaro para todos os fins que, todas as informações aqui
            prestadas são verdadeiras e estão corretas, sob pena do art. 297 do Código Penal Brasileiro.</Checkbox>

          <Button
            type='submit'
            isLoading={formState.isSubmitting}
            mb="16px"
            bg='yellowOficial'
            color='text'
            fontSize="xs"
            variant="no-effects"
            px="30px"
          >
            Cadastrar
          </Button>

          <Text as='li'>O grupo familiar será composto pelo requerente, o cônjuge ou
            companheiro, os pais e, na ausência de um deles, a madrasta ou o padrasto, os irmãos
            solteiros, os filhos e enteados solteiros e os menores tutelados, desde que vivam sob o
            mesmo teto.</Text>
          <Text as='li'>estado civil</Text>
          <Text as='li'>nacionalidade</Text>
          <Text as='li'>combo box do estado</Text>
          <Text as='li'>Quanto tempo reside em Anápolis(anos)?*</Text>
          <Text as='li'>chequebox declaro por veracidade os dados fornecidos</Text>
          {/* <Text as='li'>combo box do estado</Text>
          {/* <Text as='li'>combo box do estado</Text>
          <Text as='li'>combo box do estado</Text> */}


        </VStack>



      </Box>
    </Flex>
  )
}
