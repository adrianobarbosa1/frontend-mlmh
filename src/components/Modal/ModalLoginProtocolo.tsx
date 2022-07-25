import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Button,
    Flex,
    Text,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Modal,
    Switch,
    Input as ChakraInput,
    Box,
    FormControl,
    FormLabel,
    Heading,
    useToast,
    FormErrorMessage
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { dispatch } from "react-hot-toast/dist/core/store";
import { useAppDispatch } from "../../app/hooks";
import { RegisterProtocolo } from "../../features/register/register.interface";
import { getLoginProtocolo } from "../../features/register/registerSlice";

interface ModalProps {
    isOpen2: boolean;
    onClose2: () => void;
}

export const ModalLoginProtocolo = ({ isOpen2, onClose2 }: ModalProps) => {
    const { register, handleSubmit, formState, formState: { errors } } = useForm<RegisterProtocolo>()
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (data: RegisterProtocolo) => {
        dispatch(getLoginProtocolo(data))
            .unwrap()
            .then((result) => {
                router.push("/formupdate");
            })
            .catch((error) => {
                toast({
                    position: 'top',
                    title: "Não encontramos esse protocolo.",
                    description: `${error.message}`,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            });
    }

    return (
        <Modal
            blockScrollOnMount={false}
            isOpen={isOpen2}
            closeOnOverlayClick={false}
            onClose={onClose2}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Meu Lote Minha História</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        as='form'
                        onSubmit={handleSubmit(onSubmit)}
                        direction='column'
                        p='1rem'>

                        <FormControl isInvalid={!!errors.protocolo} >
                            <FormLabel htmlFor='protocolo'>
                                <Box display='inline-block' mr={3}>
                                    Para alterar o cadastro, insira o número de protocolo!
                                </Box>
                            </FormLabel>
                            <ChakraInput bgColor='gray.50'
                                {...register("protocolo", { required: "Protocolo é obrigatório." })}
                            />
                            <FormErrorMessage>{errors.protocolo?.message}</FormErrorMessage>
                        </FormControl>

                        <Flex justify={'end'}>
                            <Button
                                type='submit'
                                size='md'
                                mt='2rem'
                                bg='yellowOficial'
                                color='text'
                                rightIcon={<ArrowForwardIcon />}
                            >
                                Entrar
                            </Button>
                        </Flex>

                    </Flex>
                </ModalBody><ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}