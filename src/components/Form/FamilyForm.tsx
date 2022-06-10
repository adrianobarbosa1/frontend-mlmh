import { Radio, RadioGroup, SimpleGrid, Stack, VStack, Text, Heading, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "./Input";

export default function FamilyForm({ register }) {
    let grupoFamiliar = 0

    const handleOnChange = (e) => {
        grupoFamiliar = e.target.value
    }

    return (
        <VStack spacing='4'>
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

                <Select placeholder='Select option' onChange={(e) => handleOnChange(e)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </Select>
            </SimpleGrid>
            {console.log(grupoFamiliar)}
            {grupoFamiliar &&
                <SimpleGrid minChildWidth='240px' spacing='4' w='100%'>
                    <Input label='Nome completo' name='numero_familiar' />
                    <Input label='CPF' name='numero_familiar' />
                    <Input label='Data nascimento' name='numero_familiar' />
                    <Input label='Renda' name='numero_familiar' />
                    <Input label='Grau de parentesco' name='numero_familiar' />
                </SimpleGrid>
            }
        </VStack>
    );
}