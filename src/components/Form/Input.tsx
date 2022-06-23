import { forwardRef, ForwardRefRenderFunction } from "react";
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/react";
import { FieldError } from 'react-hook-form'
import NumberFormat from "react-number-format";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

interface InputProps extends ChakraInputProps {
    nome: string;
    label?: string;
    error?: FieldError;
    explication?: boolean;
    popHeader?: string;
    popBody?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
    = ({ nome, label, explication, popHeader, popBody, error = null, ...rest }, ref) => {

        return (
            // <FormControl isInvalid={!!error}>
            //     {!!label && <FormLabel htmlFor={name}>
            //         <Box display='inline-block' mr={3}>
            //             {label}
            //         </Box>
            //         {explication && (<Popover>
            //             <PopoverTrigger>
            //                 <IconButton aria-label={popHeader ? popHeader : ''} size='xs' icon={<QuestionOutlineIcon />} />
            //             </PopoverTrigger>
            //             <PopoverContent>
            //                 <PopoverArrow />
            //                 <PopoverCloseButton />
            //                 <PopoverHeader>{popHeader}</PopoverHeader>
            //                 <PopoverBody>{popBody}</PopoverBody>
            //             </PopoverContent>
            //         </Popover>)}
            //     </FormLabel>}

            //     <ChakraInput
            //         // bgColor='gray.50'
            //         // ref={ref}
            //         {...rest}
            //     />
            //     {!!error && (
            //         <FormErrorMessage>
            //             {error?.message}
            //         </FormErrorMessage>
            //     )}
            // </FormControl>
            <FormControl isInvalid={!!error} >
                <FormLabel htmlFor={nome}>
                    <Box display='inline-block' mr={3}>
                        {label}
                    </Box>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton aria-label='' size='xs' icon={<QuestionOutlineIcon />} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Email!</PopoverHeader>
                            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </FormLabel>
                <ChakraInput
                />
                <FormErrorMessage>{error?.message}</FormErrorMessage>

            </FormControl>
        )
    }

export const Input = forwardRef(InputBase)