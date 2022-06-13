import { forwardRef, ForwardRefRenderFunction } from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from "@chakra-ui/react";
import { FieldError } from 'react-hook-form'
import NumberFormat from "react-number-format";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    size?: string;
    mask?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, size, mask, error = null, ...rest }, ref) => {
        // console.log(error)
        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraInput
                    as={NumberFormat}
                    format={mask}
                    mask="_"
                    name={name}
                    id={name}
                    focusBorderColor="blue.500"
                    bgColor='gray.50'
                    size={size}
                    ref={ref}
                    {...rest}
                />
                {!!error && (
                    <FormErrorMessage>
                        {error.message}
                    </FormErrorMessage>
                )}
            </FormControl>
        )
    }

export const Input = forwardRef(InputBase)