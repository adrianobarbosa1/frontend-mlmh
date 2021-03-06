import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function FooterSocials() {
  return (
    <Flex
      justifyContent='center'
      pt='2rem'
    >
      <HStack
        spacing='4'
      >
        <Flex
          m={0.5}
          bg='white'
          color='blueGradient'
          w='1.5rem'
          h='1.5rem'
          borderRadius="1.5rem"
          justifyContent='center'
          alignItems='center'
        >
          <a >
            <FaFacebookF />
          </a>
        </Flex>

        <Flex
          m={0.5}
          bg='white'
          color='blueGradient'
          w='1.5rem'
          h='1.5rem'
          borderRadius="1.5rem"
          justifyContent='center'
          alignItems='center'
        >
          <a >
            <FaInstagram />
          </a>
        </Flex>

        <Flex
          m={0.5}
          bg='white'
          color='blueGradient'
          w='1.5rem'
          h='1.5rem'
          borderRadius="1.5rem"
          justifyContent='center'
          alignItems='center'
        >
          <a >
            <FaYoutube />
          </a>
        </Flex>
      </HStack>

    </Flex>
  );
}