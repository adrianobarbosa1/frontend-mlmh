import { Box, Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import registerSlice, { postRegister, selectRegister } from '../features/register/registerSlice'

export default function resume() {
  const { handleSubmit } = useForm()
  const { register: registro } = useAppSelector(selectRegister);
  const dispatch = useAppDispatch();
  const { register } = useAppSelector(selectRegister)
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (!register.nome) router.push("/form")
  }

  const onSubmit = (data) => {
    dispatch(postRegister(data))
      .unwrap()
      .then((result) => {
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
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
        onSubmit={handleSubmit(onSubmit(register))}
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
          Verifique se os dados estão corretos!
        </Heading>
        <Text>{`Nome: ${register.nome}`}</Text>
        <Text>{`E-mail: ${register.email}`}</Text>
        <Text>{`cpf: ${register.cpf}`}</Text>
        <Text>{`rg: ${register.rg}`}</Text>
        <Text>{`orgão emissor: ${register.orgao_emissor}`}</Text>
        <Text>{`uf rg: ${register.uf_rg}`}</Text>
        <Text>{`Data de nascimento: ${register.dt_nascimento}`}</Text>
        <Text>{`Telefone: ${register.fone}`}</Text>
        <Text>{`Sexo: ${register.sexo}`}</Text>
        <Text>{`Estado Civil: ${register.estado_civil}`}</Text>
        <Text>{`Nacionalidade: ${register.nacionalidade}`}</Text>
        <Text>{`CEP: ${register.cep}`}</Text>
        <Text>{`uf: ${register.uf}`}</Text>
        <Text>{`Município: ${register.municipio}`}</Text>
        <Text>{`Bairro: ${register.bairro}`}</Text>
        <Text>{`Quadra: ${register.quadra}`}</Text>
        <Text>{`Lote: ${register.lote}`}</Text>
        <Text>{`Logradouro: ${register.logradouro}`}</Text>
        <Text>{`Complemento: ${register.complemento ? register.complemento : ''}`}</Text>
        <Text>{`Quanto anos de residencia em Anápolis: ${register.tempo_reside}`}</Text>
        <Text>{`Renda bruta familiar: ${register.renda_bruta}`}</Text>
        <Text>{`Possui CAD. ÚNICO: ${register.cadunico}`}</Text>
        <Text>{`Vítima de violência doméstica: ${register.vitima_violencia}`}</Text>
        <Text>{`Grupo familiar possui PCD: ${register.pcd}`}</Text>
        <Text>{`Possui grupo familiar: ${register.grupo_familiar}`}</Text>

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

      </Box>
    </Flex >
  )
}
function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}

