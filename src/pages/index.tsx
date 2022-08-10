import {
  Button,
  Flex,
  Text,
  useToast,
  Image,
  useDisclosure,
  Box,
  Center
} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Link from "next/link";
import { useRouter } from "next/router";
import { ModalCadastrar } from "../components/Modal/ModalCadastrar";
import { ModalLoginProtocolo } from "../components/Modal/ModalLoginProtocolo";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <Header />
      <Flex direction='column'>
        <Box w='100%'>
          <Center>
            <Link href="/" >
              <Image
                mt='7rem'
                htmlWidth='800px'
                objectFit='cover'
                src='img/mlmhblue.png' alt='logo Meu lote minha historia' />
            </Link>
          </Center>
        </Box>

        <Flex justify={'center'} align='center' mt='2rem' mb='2rem'>
          <Flex >
            <Button
              size='lg'
              mt='2rem'
              bg='yellowOficial'
              color='text'
              onClick={onOpen}
            >
              Cadastrar
            </Button>
          </Flex>

          <Flex justify={'center'} ml='3rem'>
            <Button

              size='lg'
              mt='2rem'
              bg='yellowOficial'
              color='text'
              onClick={onOpen2}
              rightIcon={<ArrowForwardIcon />}
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
        <Center>
          <Flex direction='column'>
            <Text
              color="blue.500"
              fontSize='xl'
              mb='1rem'
              cursor={'pointer'}
              onClick={() => router.push('/perguntaserespotas')}
            >
              Perguntas e respostas CLIQUE AQUI!</Text>

            <a href="https://cdn.anapolis.go.gov.br/arquivos/mlmh/edital_chamamento_001_2022.pdf" target='_blank' rel="noreferrer">
              <Text
                color="blue.500"
                fontSize='xl'
                mb='1rem'
                cursor={'pointer'}
              >
                Edital de chamamento 001/2022</Text>
            </a>

            <a href="https://cdn.anapolis.go.gov.br/arquivos/mlmh/diario_oficial_18_julho_2022.pdf" target='_blank' rel="noreferrer" >
              <Text
                color="blue.500"
                fontSize='xl'
                mb='1rem'
                cursor={'pointer'}
              >
                Diário oficial 18 de julho de 2022</Text>
            </a>

          </Flex>

        </Center>

        <ModalCadastrar
          isOpen={isOpen}
          onClose={onClose}
        />

        <ModalLoginProtocolo
          isOpen2={isOpen2}
          onClose2={onClose2}
        />

      </Flex>
      <Footer />
    </>
  )
}
