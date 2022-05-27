import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
}

export function Input({ name, label, ...props }: InputProps) {
    return (
        <FormControl>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                type='email'
                focusBorderColor="blue.500"
                bgColor='gray.50'
                size='lg'
                {...props}

            />
        </FormControl>
    )
}