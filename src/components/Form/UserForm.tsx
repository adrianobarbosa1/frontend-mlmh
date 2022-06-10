import { Radio, RadioGroup, Select, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { Input } from "./Input";

export default function UserForm({ register }) {
    return (
        <VStack spacing='4'>
            <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
                <Input
                    label='Nome Completo'
                    {...register("nome", {
                        required: "Nome Obrigatório",
                    })}
                />
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
    );
}