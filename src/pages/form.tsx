import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form'

import { Input } from "../components/Form/Input";

export default function Form() {
  const { register, handleSubmit, watch, formState } = useForm()
  const wathGrupoFamiliar = watch('grupo_familiar')

  const onSubmit = async data => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  let inputArray = []
  {
    for (var i = 0; i <= wathGrupoFamiliar - 1; i++) {
      inputArray.push(
        <SimpleGrid key={i} minChildWidth='240px' spacing='4' w='100%'>
          <Input label='Nome completo' name='numero_familiar' />
          <Input label='CPF' name='numero_familiar' />
          <Input label='Data nascimento' name='numero_familiar' />
          <Input label='Grau de parentesco' name='numero_familiar' />
          <Input label='Renda' name='numero_familiar' />
        </SimpleGrid>
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
              label='Nome Completo'
              {...register("nome", {
                required: "Nome Obrigatório",
              })} />
            <Input
              label='E-mail'
              {...register("email", {
                required: "E-mail obrigatório",
              })}
            />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Input label='CPF' name='cpf' />
            <Input label='Data Nascimento' name='dt_nascimento' />
            <Input label='Telefone' name='telefone' />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <RadioGroup >
              <Stack direction='row'>
                <Radio value='1'>Masculino</Radio>
                <Radio value='2'>Feminino</Radio>
              </Stack>
            </RadioGroup>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <Select placeholder='Estado Civil'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Nacionalidade'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
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
            <Input label='CEP' name='cep' />
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
            <Input label='Quanto tempo reside em Anápolis?' name='numero_familiar' />
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <RadioGroup >
              <Stack direction='row'>
                <Text>Possui CADÚNICO?</Text>
                <Radio value='1'>SIM</Radio>
                <Radio value='2'>NÃO</Radio>
              </Stack>
            </RadioGroup>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <RadioGroup >
              <Stack direction='row'>
                <Text>O Grupo familiar possui PCD?</Text>
                <Radio value='1'>SIM</Radio>
                <Radio value='2'>NÃO</Radio>
              </Stack>
            </RadioGroup>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
            <RadioGroup >
              <Stack direction='row'>
                <Text>Vítima de violência doméstica?</Text>
                <Radio value='1'>SIM</Radio>
                <Radio value='2'>NÃO</Radio>
              </Stack>
            </RadioGroup>
          </SimpleGrid>

          <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>

            <Select
              placeholder='Número de pessoas no Grupo familiar?'
              {...register("grupo_familiar", {
                required: "Número de pessoas",
              })}
            >
              <option value={0}>Não possui grupo familiar</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Select>
          </SimpleGrid>

          {wathGrupoFamiliar && inputArray}

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
