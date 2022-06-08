import { Box, Button, Divider, Flex, Heading, Radio, RadioGroup, Select, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import { useForm } from 'react-hook-form'

import { Input } from "../components/Form/Input";

export default function Form() {
  const { register, handleSubmit } = useForm()

  // function handleEnviar(values) {
  //   console.log(values)
  // }

  return (
    <Flex
      w='100%'
      maxWidth={1480}
      mx='auto'
      px='6'
      my='6'
      pt='5rem'
    // background='url(/img/background.png) center/cover no-repeat'
    // direction='column'
    // align='center'
    >
      <Box
        as='form'
        // onSubmit={handleSubmit(handleEnviar)}
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
            <Input label='Nome Completo' name='nome' />
            <Input label='E-mail' name='email' />
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
            <Select mb='2rem' placeholder='Nacionalidade'>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </SimpleGrid>
        </VStack>

        <Divider my='6' borderColor='blueOficial' />
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
            <Input label='Logradouro' name='logradouro' />
            <Input label='Quadra' name='quadra' />
            <Input label='Lote' name='lote' />
          </SimpleGrid>

          <SimpleGrid spacing='4' w='100%'>
            <Input label='Complemento' name='complemento' />
            <Input label='Possui CadÚnico' name='possui_cadunico' />
            <Input label='Número de pessoas no Grupo Familiar' name='numero_familiar' />
          </SimpleGrid>

          <Button
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
