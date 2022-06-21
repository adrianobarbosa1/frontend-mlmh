import React from 'react'
import { Box, Divider, Flex, Heading, Icon } from '@chakra-ui/react'
import icon from '../../public/img/success.gif';
import { motion } from "framer-motion"
import Image from "next/image";

export default function Protocolo() {
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
                <Flex as='figure' justify='center'>
                    <Box w='200px'>
                        <Image src={icon} alt='success' />
                    </Box>
                </Flex>
            </Box>
        </Flex >
    )
}
