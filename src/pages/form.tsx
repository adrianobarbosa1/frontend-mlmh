import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from "../components/Form/Input";

const schema = yup.object().shape({
  nome: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido'),
  cpf: yup.string().required('CPF obrigatório'),
  dt_nascimento: yup.string().required('Data obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  sexo: yup.string().required('O campo sexo, não pode ficar vazio'),
  estado_civil: yup.string().required('Estado Civil obrigatório'),
  nacionalidade: yup.string().required('Nacionalidade obrigatório'),
  cep: yup.string().required('CEP obrigatório'),
  tempo_reside: yup.number().typeError("Apenas números").required('Tempo de residencia obrigatório'),
  renda_bruta: yup.number().typeError("Apenas números").required('Renda bruta obrigatório'),
  cadunico: yup.string().required('Possui cad. único obrigatório'),
  vitima_violencia: yup.string().required('Campo vítima de violência, não pode ficar vazio'),
  pcd: yup.string().required('Possui PCD obrigatório'),
  grupo_familiar: yup.string().required('Número obrigatório'),
  numero_cadunico: yup.string().when("cadunico", {
    is: 'possui cadunico',
    then: yup.string().required("numero cad. único obrigatório")
  }),
  gf_nome: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("numero cad. único obrigatório")
  }),
  gf_cpf: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("numero cad. único obrigatório")
  }),
  gf_dt_nascimento: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("numero cad. único obrigatório")
  }),
  gf_grau_parentesco: yup.string().when("grupo_familiar", {
    is: 'sim',
    then: yup.string().required("numero cad. único obrigatório")
  }),


}).required();

export default function Form() {
  const { register, handleSubmit, watch, formState, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const wathGrupoFamiliar = watch('grupo_familiar')
  const wathCadunico = watch('cadunico')
  const wathGfQuantidade = watch('gf_quantidade')
  console.log(errors)

  const onSubmit = async data => {
    await new Promise(resolve => setTimeout(resolve, 2000))
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
            <Input label='Nome completo*'
              {...register("gf_nome", {
                required: "Nome Obrigatório",
              })} />

            <Input label='CPF*'
              {...register("gf_cpf", {
                required: "cpf Obrigatório",
              })} />

            <Input label='Data de nascimento*'
              {...register("gf_dt_nascimento", {
                required: "Data nascimento Obrigatório",
              })} />

            <Input label='Grau de parentesco*'
              {...register("gf_grau_parentesco", {
                required: "Grau parentesco Obrigatório",
              })} />
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
              {...register("nome")} />
            <Input
              error={errors.email}
              label='E-mail'
              {...register("email")}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input
              error={errors.cpf}
              label='CPF*'
              {...register("cpf")} />
            <Input
              error={errors.dt_nascimento}
              label={`Data de Nascimento`}
              {...register("dt_nascimento")} />
            <Input
              error={errors.telefone}
              label='Telefone*'
              {...register("telefone")} />
          </SimpleGrid>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <FormLabel as='legend'>Sexo<Text as='span' color='red'>*</Text></FormLabel>
              <RadioGroup >
                <HStack spacing='24px'>
                  <Radio value='masculino'
                    {...register("sexo")}>Masculino</Radio>
                  <Radio value='feminino'
                    {...register("sexo")}>Feminino</Radio>
                </HStack>
              </RadioGroup>
            </SimpleGrid>
          </FormControl>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Select
              placeholder='Estado Civil*'
              {...register("estado_civil")}>
              <option value='solteiro'>1. Solteiro</option>
              <option value='casado'>2. Casado</option>
              <option value='separado'>3. Separado</option>
              <option value='divorciado'>4. Divorciado</option>
              <option value='viuvo'>5. Viúvo</option>

            </Select>
            <Select
              placeholder='Nacionalidade*'
              {...register("nacionalidade")}>
              <option value='nato'>Brasileiro nato</option>
              <option value='naturalizado'>Brasileiro naturalizado</option>
            </Select>
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
            <Input
              error={errors.cep}
              label='CEP*'
              {...register("cep")} />
            <Input label='UF' name='uf' />
            <Input label='Município' name='municipio' />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input label='Bairro' name='bairro' />
            <Input label='Quadra' name='quadra' />
            <Input label='Lote' name='lote' />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input label='Logradouro' name='logradouro' />
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
              label='Quanto tempo reside em Anápolis?*'
              {...register("tempo_reside")} />
            <Input
              error={errors.renda_bruta}
              label='Renda bruta familiar*'
              {...register("renda_bruta")} />
          </SimpleGrid>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <FormLabel as='legend'>Possui CAD. ÚNICO?<Text as='span' color='red'>*</Text></FormLabel>
              <RadioGroup >
                <HStack spacing='24px'>
                  <Radio value='possui cadunico'
                    {...register("cadunico")}>SIM</Radio>
                  <Radio value='nao possui cadunico'
                    {...register("cadunico")}>NÃO</Radio>
                </HStack>
              </RadioGroup>
            </SimpleGrid>
          </FormControl>

          {wathCadunico == 'possui cadunico' &&
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
              <Input
                error={errors.numero_cadunico}
                label='Numero do cad. único*'
                {...register("numero_cadunico")} />
            </SimpleGrid>}

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <FormLabel as='legend'>Vítima de violência doméstica?<Text as='span' color='red'>*</Text></FormLabel>
              <RadioGroup >
                <HStack spacing='24px'>
                  <Radio value='vitima de violencia domestica'
                    {...register("vitima_violencia")}>SIM</Radio>
                  <Radio value='nao e vitima de violencia domestica'
                    {...register("vitima_violencia")}>NÃO</Radio>
                </HStack>
              </RadioGroup>
            </SimpleGrid>
          </FormControl>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <FormLabel as='legend'>Grupo familiar possui PCD?<Text as='span' color='red'>*</Text></FormLabel>
              <RadioGroup >
                <HStack spacing='24px'>
                  <Radio value='possui pcd'
                    {...register("pcd")}>SIM</Radio>
                  <Radio value='nao possui pcd'
                    {...register("pcd")}>NÃO</Radio>
                </HStack>
              </RadioGroup>
            </SimpleGrid>
          </FormControl>

          <FormControl>
            <SimpleGrid
              minChildWidth='240px'
              spacing='4' w='100%'
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >

              <FormLabel as='legend'>Possui grupo familiar?<Text as='span' color='red'>*</Text></FormLabel>
              <RadioGroup >
                <HStack spacing='24px'>
                  <Radio value='sim'
                    {...register("grupo_familiar")}>SIM</Radio>
                  <Radio value='nao'
                    {...register("grupo_familiar")}>NÃO</Radio>
                </HStack>
              </RadioGroup>
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
