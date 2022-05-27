import { Button, Flex, Wrap } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function Register() {
    return (
        <Flex
            w='100vw'
            h='100vh'
            align='center'
            justify='center'
        >

            <Wrap as='form'
                w='100%'
                maxWidth={1170}
                bg='gray.100'
                p='8' borderRadius={8}

            >

                <h1>Cadastro meu Lote minha história</h1>
                <Input maxWidth={360} name='' label='CPF' />
                <Input maxWidth={360} name='' label='Nome completo' />
                <Input name='' label='Data nascimento' />
                <Input name='' label='Sexo' />
                <Input name='' label='Estado civil' />
                <Input name='' label='Nacionalidade' />
                <Input name='' label='E-mail' />
                <Input name='' label='Telefone' />

                <Button type='submit' mt='6' colorScheme='blue'>Salvar</Button>
            </Wrap>
        </Flex >
    )
}