import { forwardRef, ForwardRefRenderFunction } from "react";
import {
    FormControl,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    size?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ name, label, size, ...rest }, ref) => {
        return (
            <FormControl>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

                <ChakraInput
                    name={name}
                    id={name}
                    focusBorderColor="blue.500"
                    bgColor='gray.50'
                    size={size}
                    ref={ref}
                    {...rest}
                />
            </FormControl>
        )
    }

export const Input = forwardRef(InputBase)