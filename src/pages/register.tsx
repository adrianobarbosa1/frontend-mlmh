import { Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function Register() {
    return (
        <Flex
            w='100vw'
            h='100vh'
            align='center'
            justify='center'
        >
            <Flex>
                <Wrap as='form'
                    w='100%'
                    maxWidth={1170}
                    bg='gray.100'
                    p='8' borderRadius={8}

                >



                    <WrapItem>
                        <Input maxWidth={360} name='' label='CPF' />
                    </WrapItem>
                    <WrapItem>
                        <Input maxWidth={360} name='' label='Nome completo' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='Data nascimento' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='Sexo' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='Estado civil' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='Nacionalidade' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='E-mail' />
                    </WrapItem>
                    <WrapItem>
                        <Input name='' label='Telefone' />
                    </WrapItem>

                    <Button type='submit' mt='6' colorScheme='blue'>Salvar</Button>
                </Wrap >
            </Flex>
        </Flex >
    )
}