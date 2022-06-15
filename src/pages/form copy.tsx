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
  VStack
} from "@chakra-ui/react";
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Form/Input";
import { useMutation, useQuery } from "react-query";
import { api } from "../services/api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCepAddress, selectRegister } from "../components/features/register/registerSlice";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import axios from "axios";
import { cepAddress } from "../components/features/register/registerAPI";
import { MaskedInput } from "../components/Form/maskedInput";

const schema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido'),
  cpf: yup.string().required('CPF obrigatório'),
  dt_nascimento: yup.string().required('Data obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  sexo: yup.string().typeError("Campo sexo é obrigatório").required('O campo sexo, não pode ficar vazio'),
  estado_civil: yup.string().required('Estado Civil obrigatório'),
  nacionalidade: yup.string().required('Nacionalidade obrigatório'),
  cep: yup.string().required('CEP obrigatório'),
  uf: yup.string().required('UF obrigatório'),
  municipio: yup.string().required('Município obrigatório'),
  tempo_reside: yup.number().typeError("Apenas números").required('Tempo de residencia obrigatório'),
  // renda_bruta: yup.number().typeError("Apenas números").required('Renda bruta obrigatório'),
  cadunico: yup.string().typeError("Campo cad. único é obrigatório").required('Possui cad. único obrigatório'),
  vitima_violencia: yup.string().typeError("Campo vítima violencia é obrigatório").required('Campo vítima de violência, não pode ficar vazio'),
  pcd: yup.string().typeError("Campo possui PCD é obrigatório").required('Possui PCD obrigatório'),
  grupo_familiar: yup.string().typeError("Grupo familiar é obrigatório").required('Número obrigatório'),
  numero_cadunico: yup.string().when("cadunico", {
    is: 'possui cadunico',
    then: yup.string().required("Numero cad. único obrigatório")
  }),
  gf_nome: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("Nome obrigatório")
  }),
  gf_cpf: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("CPF obrigatório")
  }),
  gf_dt_nascimento: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("Data de nascimento obrigatório")
  }),
  gf_grau_parentesco: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("Grau de parentesco obrigatório")
  }),


}).required();

export default function Form() {
  const { register, control, setValue, handleSubmit, watch, formState, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const { register: registro } = useAppSelector(selectRegister);
  const dispatch = useAppDispatch();

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

  // async function getCep(cep: string): Promise<any | undefined> {
  //   const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
  //   const address = {
  //     localidade: data.localidade,
  //     uf: data.uf,
  //     logradouro: data.logradouro,
  //     bairro: data.bairro,

  //   }
  //   console.log(address)
  //   return address

  // }

  // const { data } = useQuery('address', () => getCep(), {
  //   staleTime: 1000 * 5,
  // })


  const wathGrupoFamiliar = watch('grupo_familiar')
  const wathCadunico = watch('cadunico')
  const wathGfQuantidade = watch('gf_quantidade')


  const onSubmit = data => {
    // await createRegister.mutateAsync(data)
    console.log(data)
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
          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input
              error={errors.gf_nome}
              label='Nome completo*'
              {...register("gf_nome")} />


            <Controller
              name="gf_cpf"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
                {...field}
                error={errors.gf_cpf}
                label='CPF*'
                mask="###.###.###-##"
              />}
            />

            <Controller
              name="gf_dt_nascimento"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
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
      mx='auto'
      px='6'
      my='6'
      pt='5rem'
    >
      <Box
        as='form'
        onSubmit={handleSubmit(onSubmit)}
        flex='1'
        bg='#fff'
        p='8'
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
            <Input
              error={errors.nome}
              label='Nome Completo*'
              {...register("nome")}
            />
            <Input
              error={errors.email}
              label='E-mail'
              {...register("email")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Controller
              name="cpf"
              defaultValue=''
              control={control}
              render={({ field }) => <MaskedInput
                {...field}
                error={errors.cpf}
                label='CPF*'
                mask="###.###.###-##"
              />}
            />

            <Controller
              name="dt_nascimento"
              defaultValue=''
              control={control}
              render={({ field }) => <MaskedInput
                {...field}
                error={errors.dt_nascimento}
                label={`Data de Nascimento`}
                mask="##/##/####"
              />}
            />

            <Controller
              name="telefone"
              defaultValue=''
              control={control}
              render={({ field }) => <MaskedInput
                {...field}
                error={errors.telefone}
                label='Telefone*'
                mask="(##)#-####-####"
              />}
            />
          </SimpleGrid>

          <FormControl>
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
                      {...register("sexo")}>Masculino</Radio>
                    <Radio value='feminino' type="radio"
                      {...register("sexo")}>Feminino</Radio>
                  </HStack>
                </RadioGroup>
                <Text as='p' color='#e53e3e' fontSize='14px'>{errors.sexo?.message}</Text>
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
          Dados endereço
        </Heading>

        <VStack spacing='4'>
          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Controller
              name="cep"
              defaultValue=''
              control={control}
              render={({ field }) => <MaskedInput
                {...field}
                error={errors.cep}
                label='CEP*'
                mask='#####-###'
                onBlur={(e) => handleCep(e)}
              />}
            />

            {/* <Input label='UF' name='uf' /> */}
            <Controller
              name="uf"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
                {...field}
                error={errors.uf}
                label='UF*'
              />}
            />

            {/* <Input label='Município' name='municipio' /> */}
            <Controller
              name="municipio"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
                {...field}
                error={errors.municipio}
                label='Município*'
              />}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            {/* <Input label='Bairro' name='bairro' /> */}
            <Controller
              name="bairro"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
                {...field}
                error={errors.bairro}
                label='Bairro*'
              />}
            />
            <Input label='Quadra' name='quadra' />
            <Input label='Lote' name='lote' />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            {/* <Input label='Logradouro' name='logradouro' /> */}
            <Controller
              name="logradouro"
              defaultValue=''
              control={control}
              render={({ field }) => <Input
                {...field}
                error={errors.logradouro}
                label='Logradouro*'
              />}
            />
            <Input label='Complemento' name='complemento' mb='2rem' />
          </SimpleGrid>

          <Divider my='6' borderColor='blueOficial' />

          <Heading
            fontWeight='bold'
            color='text'
            size='md'
            textAlign='center'
            mb='2rem'
          >
            Dados Grupo Familiar
          </Heading>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input
              error={errors.tempo_reside}
              type="number"
              label='Quanto tempo reside em Anápolis?*'
              {...register("tempo_reside")} />

            {/* <FormControl> */}
            {/* <FormLabel>Renda bruta familiar</FormLabel> */}
            <Controller
              name={'teste'}
              defaultValue=''
              control={control}
              render={({ field }) => <NumberFormat
                {...field}
                customInput={ChakraInput}
                focusBorderColor="blue.500"
                bgColor='gray.50'
                thousandSeparator='.'
                prefix="R$"
                decimalSeparator=','
                decimalScale={2}
                fixedDecimalScale={true}
              />}
            />
            {/* </FormControl> */}
          </SimpleGrid>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Flex direction='column'>
                <FormLabel as='legend'>Possui CAD. ÚNICO?<Text as='span' color='red'>*</Text></FormLabel>
                <RadioGroup >
                  <HStack spacing='24px'>
                    <Radio value='possui cadunico'
                      {...register("cadunico")}>SIM</Radio>
                    <Radio value='nao possui cadunico'
                      {...register("cadunico")}>NÃO</Radio>
                  </HStack>
                </RadioGroup>

                <Text as='p' color='#e53e3e' fontSize='14px'>{errors.cadunico?.message}</Text>
              </Flex>
            </SimpleGrid>
          </FormControl>

          {wathCadunico == 'possui cadunico' &&
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <Input
                error={errors.numero_cadunico}
                type="number"
                label='Numero do cad. único*'
                {...register("numero_cadunico")} />
            </SimpleGrid>}

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Flex direction='column'>
                <FormLabel as='legend'>Vítima de violência doméstica?<Text as='span' color='red'>*</Text></FormLabel>
                <RadioGroup >
                  <HStack spacing='24px'>
                    <Radio value='vitima de violencia domestica'
                      {...register("vitima_violencia")}>SIM</Radio>
                    <Radio value='nao e vitima de violencia domestica'
                      {...register("vitima_violencia")}>NÃO</Radio>
                  </HStack>
                </RadioGroup>

                <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.vitima_violencia?.message}</Text>

              </Flex>
            </SimpleGrid>
          </FormControl>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <Flex direction='column'>
                <FormLabel as='legend'>Grupo familiar possui PCD?<Text as='span' color='red'>*</Text></FormLabel>
                <RadioGroup >
                  <HStack spacing='24px'>
                    <Radio value='possui pcd'
                      {...register("pcd")}>SIM</Radio>
                    <Radio value='nao possui pcd'
                      {...register("pcd")}>NÃO</Radio>
                  </HStack>
                </RadioGroup>

                <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.vitima_violencia?.message}</Text>

              </Flex>
            </SimpleGrid>
          </FormControl>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <Flex direction='column'>
                <FormLabel as='legend'>Possui grupo familiar?<Text as='span' color='red'>*</Text></FormLabel>
                <RadioGroup >
                  <HStack spacing='24px'>
                    <Radio value='sim'
                      {...register("grupo_familiar")}>SIM</Radio>
                    <Radio value='nao'
                      {...register("grupo_familiar")}>NÃO</Radio>
                  </HStack>
                </RadioGroup>

                <Text as='p' mt='1' color='#e53e3e' fontSize='14px'>{errors.vitima_violencia?.message}</Text>
              </Flex>
            </SimpleGrid>
          </FormControl>

          {wathGrupoFamiliar == 'sim' &&
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <Select
                placeholder='Número de pessoas no Grupo familiar?*'
                {...register("gf_quantidade")}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>

              </Select>
            </SimpleGrid>}

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
        </VStack>



      </Box>
    </Flex>
  )
}
