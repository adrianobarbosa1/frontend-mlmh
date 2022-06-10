import { SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "./Input";

export default function AddressForm() {
    return (
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
                <Input label='Complemento' name='complemento' />
            </SimpleGrid>

        </VStack>
    );
}