import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { FieldError, UseFormRegister, FieldValues } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    nome: string;
    label?: string;
    explication?: boolean;
    popHeader?: string;
    popBody?: string;
    errors?: FieldError;
    registerInput: UseFormRegister<FieldValues>;
}

export const Input = ({ errors, nome, registerInput, label }: InputProps) => {
    return (
        <>
            <FormControl isInvalid={errors} >
                <FormLabel htmlFor={nome}>
                    <Box display='inline-block' mr={3}>
                        {label}
                    </Box>
                </FormLabel>
                <ChakraInput bgColor='gray.50'
                    {...registerInput(`${nome}`, { required: "Nome é obrigatório." })}
                />
                <FormErrorMessage>{errors?.message}</FormErrorMessage>
            </FormControl>
        </>
    )
}