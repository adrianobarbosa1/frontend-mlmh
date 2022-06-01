import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Flex
        w='100%'
        h='30rem'
        background='url(/img/lote.jpg) center/cover no-repeat'
        direction='column'
        align='center'
      >

        <Text pt='2rem' fontSize='4xl' color='text' fontWeight='bold'>
          Meu Lote Minha História
        </Text>
        <Text
          fontSize='md'
          color='text'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}>
          Use these awesome forms to login or create new account in your project
          for free.
        </Text>
        <Button
          mb="16px"
          bg='yellowOficial'
          color='text'
          fontSize="xs"
          variant="no-effects"
          px="30px"
        >
          Cadastrar
        </Button>
      </Flex>

    </>
  )
}
