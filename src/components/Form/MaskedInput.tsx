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
    thousandSeparator?: string;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
    decimalSeparator?: string;
    prefix?: string;
    mask?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, size, decimalSeparator, mask, thousandSeparator, fixedDecimalScale, decimalScale, prefix, error = null, ...rest }, ref) => {

        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                <NumberFormat
                    customInput={ChakraInput}
                    name={name}
                    focusBorderColor="blue.500"
                    bgColor='gray.50'
                    size={size}
                    format={mask}
                    ref={ref}
                    decimalSeparator={decimalSeparator}
                    thousandSeparator={thousandSeparator}
                    prefix={prefix}
                    decimalScale={decimalScale}
                    fixedDecimalScale={fixedDecimalScale}
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

export const MaskedInput = forwardRef(InputBase)