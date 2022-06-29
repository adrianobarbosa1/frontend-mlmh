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
  useDisclosure,
  Switch,
  FormControl,
  FormLabel,
  Box,
  Input as ChakraInput,
  FormErrorMessage,
  SimpleGrid,
  Heading,
  GridItem,
  Grid,
  Center
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Layout from "../components/layout";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const [switchOpen, setSwitchOpen] = useState(false)
  const router = useRouter();

  return (
    <Flex direction='column' background='url(/img/background.jpg) center/cover no-repeat'>
      <Box w='100%'>
        <Text
          mt='2rem'
          fontSize='4xl'
          color='text'
          fontWeight='bold'
          align={'center'}
          w={{ sm: "70%", lg: "40%", xl: "100%" }}
        >
          Meu Lote Minha História
        </Text>
      </Box>

      <Flex justify={'center'} align='center' mt='10rem' mb='17rem'>
        <Flex >
          <Button
            size='md'
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

            size='md'
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

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        onClose={onClose}
        size={'2xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Meu Lote Minha História</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as='p' mb='1rem'>
              A inscrição no Programa MEU LOTE MINHA HISTÓRIA
              seguirá EDITAL DE CHAMAMENTO PÚBLICO Nº xxx/2022

              de acordo com Lei Complementar Municipal nº 493,
              de 19 de maio de 2022.
            </Text>
            <Box
              borderRadius={6}
              bg='blue.100'
              color='blue.700'
              p='1rem'
            >
              <Text as='p' fontWeight='bold'>Não se esqueça de ler o
                <Text as='a' color='blue.500' target="_blank"
                  href={"https://diario.anapolis.go.gov.br/dowebans/page/diarioOficial.jsf"}
                >
                  {` `}Edital
                </Text> do programa antes de realizar sua inscrição
              </Text>
              <br />
              <Text as='p' fontWeight='bold'>
                A pessoa que for desclassificada por apresentar dados, informações, declarações ou documentos falsos, não poderá participar de outras inscrições do Programa “Meu Lote, Minha História.
              </Text>

              <br />
              <Text as='p' fontWeight='bold'>
                Todas as publicações oficiais serão feitas
                através do Diário Oficial do Município, localizado no site da
                <Text as='a' color='blue.500' target="_blank" href="https://www.anapolis.go.gov.br/">
                  {` `}Prefeitura de Anápolis
                </Text>.
              </Text>
            </Box>
            <Text as='p'>
              <br />
              DECLARO, para os devidos fins de direito, sob as penas da lei, que as informações aqui prestadas e os documentos apresentados nos anexos, são verdadeiros.
              Fico ciente através deste Termo de Aceite que a falsidade de informações configura crime previsto no Código Penal Brasileiro, passível de apuração na forma da Lei bem como pode ser enquadrada como litigância de Má-Fé.
              Ciente das responsabilidades das informações prestadas, aceito este Termo de Responsabilidade.
            </Text>
          </ModalBody>

          <Flex ml='1.5rem' mt='2rem'>
            <Text>Eu li e estou de acordo com os termos!</Text>
            <Switch ml='0.5rem' size={'md'} onChange={() => setSwitchOpen(!switchOpen)} />
          </Flex>

          <ModalFooter>
            {switchOpen ? (
              <Button
                bg='yellowOficial'
                color='text'
                onClick={() => router.push('/form')}
              >
                Cadastrar
              </Button>
            ) : ''}

          </ModalFooter>
        </ModalContent>
      </Modal>

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
            <Flex direction='column' p='1rem'>
              <FormControl>
                <FormLabel htmlFor='nome'>
                  <Heading mt='2rem' fontSize={'lg'} color='text' textAlign={'center'}>Para alterar o cadastro, insira o número de protocolo!</Heading>

                </FormLabel>
                <ChakraInput bgColor='gray.50'
                />
                <FormErrorMessage>
                </FormErrorMessage>
              </FormControl>



            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex justify={'end'}>
              <Button
                size='md'
                mt='2rem'
                bg='yellowOficial'
                color='text'
                rightIcon={<ArrowForwardIcon />}
              >
                Entrar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  )
}
