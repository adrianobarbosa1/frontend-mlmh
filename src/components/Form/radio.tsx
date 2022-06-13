import { forwardRef, ForwardRefRenderFunction } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Radio,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    RadioGroup,
} from "@chakra-ui/react";
import { FieldError } from 'react-hook-form'

interface RadioProps extends ChakraInputProps {
    name?: string;
    label?: string;
    value1?: string;
    value2?: string;
    size?: string;
    error?: FieldError;
}

const RadioBase: ForwardRefRenderFunction<HTMLInputElement, RadioProps>
    = ({ name, label, value1, value2, error = null, ...rest }, ref) => {
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <RadioGroup name={name} ref={ref}>
                    <HStack spacing='24px'>
                        <Radio value={value1}
                            {...rest}>Masculino</Radio>
                        <Radio value={value2}
                            {...rest}>Feminino</Radio>
                    </HStack>
                </RadioGroup>
                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        )
    }

export const Radio = forwardRef(RadioBase)