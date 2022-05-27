import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

export default function Home() {
  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >

      <Flex
        as='form'
        w='100%'
        maxWidth={360}
        bg='gray.100'
        p='8' borderRadius={8}
        flexDir='column'
      >
        <Flex align='center' justify='center' mb='6'>
          <h1 >Meu lote minha história</h1>
        </Flex>
        <Stack spacing='4'>
          <Input name='cpf' type='cpf' label='CPF' size='lg' />
          <Input name='password' type='password' label='Senha' size='lg' />
        </Stack>

        <Button type='submit' mt='6' colorScheme='blue'>Entrar</Button>

      </Flex>
    </Flex>
  )
}
