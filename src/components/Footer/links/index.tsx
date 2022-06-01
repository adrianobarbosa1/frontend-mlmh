import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function FooterLinks() {
  return (
    <Box
      color="white"
      textAlign='center'
      m='0.2rem'
      pt='0.7rem'
      fontSize='xs'
    >
      <Flex
        justifyContent='center'
        gap='0.5rem'
      >

        <a> Fale Conosco</a>
        <div>&#8226;</div>
        <a> Mais Informações</a>
      </Flex>
    </Box>
  );
}


