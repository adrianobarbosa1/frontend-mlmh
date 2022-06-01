import { Box } from "@chakra-ui/react";
import React from "react";

export default function FooterCopyright() {
  return (
    <Box
      color="white"
      textAlign='center'
      m='0.2rem'
      pt='0.3rem'
      pb='0.3rem'
      fontSize='xs'
    >
      © {` ${new Date().getFullYear()}.`} Prefeitura de Anápolis. Todos os direitos reservados.
    </Box>
  );
}