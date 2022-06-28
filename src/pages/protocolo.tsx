import React, { useState } from 'react'
import { Box, Divider, Flex, Heading, Icon } from '@chakra-ui/react'
import animationData from '../../public/img/success.json'
import Lottie from 'react-lottie';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { postRegister, selectRegister } from '../features/register/registerSlice';

export default function Protocolo() {
    const [animation, setAnimation] = useState({
        isStopped: false, isPaused: false
    })
    const { register } = useAppSelector(selectRegister);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Flex
            w='100%'
            maxWidth={1480}
            mx='auto'
            px='6'
            my='6'
            pt='5rem'
        >
            <Box
                as='form'
                flex='1'
                bg='#fff'
                p='8'
                boxShadow='dark-lg'
                rounded='xl'
            >
                <Divider my='6' borderColor='blueOficial' />

                <Heading
                    fontWeight='bold'
                    color='text'
                    size='md'
                    textAlign='center'
                    mb='2rem'
                >
                    Cadastro realizado com sucesso!
                </Heading>
                <Heading
                    fontWeight='bold'
                    color='text'
                    size='md'
                    textAlign='center'
                    mb='2rem'
                    color='red'
                >
                    ATENÇÂO! Anote o número do seu protocolo.
                    Caso queira, realizar alguma alteração em seu cadastro
                    será necessario a ultilização do mesmo.
                    Informamos ainda que, o número de protocolo é pessoal e intransferível!
                </Heading>
                <Flex as='figure' justify='center'>
                    {/* <Box w='200px'>
                        <Image src={icon} alt='success' />
                    </Box> */}
                    <Lottie options={defaultOptions}
                        height={200}
                        width={200}
                        isStopped={animation.isStopped}
                        isPaused={animation.isPaused} />
                </Flex>

                <Heading
                    fontWeight='bold'
                    color='text'
                    size='md'
                    textAlign='center'
                    mb='2rem'
                >
                    Seu protocolo é: {`${register}`}
                </Heading>
            </Box>
        </Flex >
    )
}
