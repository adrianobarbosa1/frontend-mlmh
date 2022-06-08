import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";

export default function Form() {
  return (

    <Flex
      w='100%'
      h='100vh'
      pt='5rem'
      background='url(/img/background.png) center/cover no-repeat'
      direction='column'
      align='center'
    >
      <Flex
        position='absolute'
        bg='#fff'
        w='auto'
        h='auto'
        m='2rem'
        p='1rem'
        boxShadow='dark-lg'
        rounded='xl'
      >
        <Text
          pt='2rem'
          fontSize='4xl'
          color='text'
          fontWeight='bold'
          align='center'
          w={{ sm: "70%", lg: "40%", xl: "100%" }}
        >
          Meu Lote Minha História
        </Text>
        <Text
          fontSize='md'
          color='text'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          align='center'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "20%" }}>
          Form
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
    </Flex>
  )
}
