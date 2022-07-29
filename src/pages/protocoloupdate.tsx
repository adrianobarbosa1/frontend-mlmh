import React, { useState } from 'react'
import { Divider, Flex, Heading, Text } from '@chakra-ui/react'
import animationData from '../../public/img/success.json'
import { Player } from '@lottiefiles/react-lottie-player';
import { useAppSelector } from '../app/hooks';
import { selectRegister } from '../features/register/registerSlice';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ProtocoloUpdate() {
    const [animation, setAnimation] = useState({
        isStopped: false, isPaused: false
    })
    const { register } = useAppSelector(selectRegister);

    return (
        <>
            <Header />
            <Flex
                w='100%'
                maxWidth={1480}
                mx='auto'
                px='6'
                my='6'
            >
                <Flex
                    as='form'
                    flex='1'
                    bg='#fff'
                    p='8'
                    boxShadow='dark-lg'
                    rounded='xl'
                    direction={'column'}
                    align='center'
                >
                    <Divider my='6' borderColor='blueOficial' />

                    <Heading
                        fontWeight='bold'
                        color='text'
                        size='md'
                        textAlign='center'
                        mb='2rem'
                    >
                        Atualização realizada com sucesso!
                    </Heading>
                    <Text
                        fontWeight='bold'
                        fontSize={'sm'}
                        textAlign='center'
                        mb='2rem'
                        color='red'
                    >
                        ATENÇÂO! Anote o número do seu protocolo.
                        <br />
                        Caso queira, realizar alguma alteração em seu cadastro
                        será necessario a ultilização do mesmo.
                        Informamos ainda que, o número de protocolo é pessoal e intransferível!
                    </Text>
                    <Flex as='figure' justify='center'>

                        <Player
                            autoplay={true}
                            loop={false}
                            keepLastFrame={true}
                            src={animationData}
                            style={{ height: '200px', width: '200px' }}
                        >
                        </Player>
                    </Flex>

                    <Heading
                        fontWeight='bold'
                        color='text'
                        size='md'
                        textAlign='center'
                        mb='2rem'
                    >
                        Seu protocolo é: {`${register?.protocolo}`}
                    </Heading>
                </Flex>
            </Flex >
            <Footer />
        </>
    )
}
