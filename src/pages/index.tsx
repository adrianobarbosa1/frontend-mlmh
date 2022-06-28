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
  Grid
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [switchOpen, setSwitchOpen] = useState(false)
  const router = useRouter();

  return (
    <>
      <Box
        mt='4.4rem'
      >
        <Flex m='1rem' direction='column' >
          <Grid
            templateAreas={
              `"header header"
             "nav main"
             "nav main"`}
            gridTemplateRows={'50px 1fr 470px'}
            gridTemplateColumns={'70% 1fr'}
            h='200px'
            gap='1'
            color='black'
          >
            <GridItem pl='2' area={'header'}>
              <Box
                w='100%'
              >
                <Heading
                  fontSize='4xl'
                  color='text'
                  fontWeight='bold'
                  align='center'
                  w={{ sm: "70%", lg: "40%", xl: "100%" }}
                >
                  Meu Lote Minha História
                </Heading>
              </Box>
            </GridItem>

            <GridItem pl='2' area={'nav'}>
              <Flex
                direction='column'
                p='1rem'
                border='1px solid gray'
                borderRadius='1rem'
                boxShadow='md'
              >
                <Box mt='3.75rem'>
                  <Text as='p'>
                    A inscrição no Programa MEU LOTE MINHA HISTÓRIA
                    seguirá todas as regras contidas no Edital,
                    de acordo com Lei Complementar Municipal nº 493,
                    de 19 de maio de 2022 e Portaria nº.: .. .
                  </Text>
                  <br />
                  <Text as='p'>Após a conclusão da inscrição será
                    possível alterar os dados, para isso ultilize o
                    número de protocolo da incrição, no prazo estipulado no edital.</Text>
                  <br />
                </Box>
                <Box
                  borderRadius={6}
                  bg='blue.100'
                  color='blue.700'
                  p='1rem'
                >
                  <Text as='p' fontWeight='bold'>Não se esqueça de ler o
                    <Text as='a' color='blue.500'
                      href={"https://diario.anapolis.go.gov.br/dowebans/page/diarioOficial.jsf"}
                    >
                      Edital
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
                    <Text as='a' href="https://www.anapolis.go.gov.br/">
                      Prefeitura de Anápolis
                    </Text>.
                  </Text>
                </Box>

                <Flex justify={'center'}>
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

              </Flex>

            </GridItem>

            <GridItem pl='2' area={'main'}>
              <Flex
                h='470px'
                align='center'
                justify='center'
                border='1px solid gray'
                borderRadius='1rem'
                boxShadow='md'
                p='1rem'
              >

                <Flex direction='column' p='1rem'>
                  <SimpleGrid minChildWidth='330px' maxW='400px' spacing='4' w='100%'>
                    <FormControl>
                      <FormLabel htmlFor='nome'>
                        <Heading mt='2rem' fontSize={'xl'} textAlign={'center'}>Para alterar o cadastro, insira o número de protocolo!</Heading>

                      </FormLabel>
                      <ChakraInput bgColor='gray.50'
                      />
                      <FormErrorMessage>
                      </FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>

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

                </Flex>
              </Flex>
            </GridItem>

          </Grid>

        </Flex>
      </Box>


      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        onClose={onClose}
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Meu Lote Minha História</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as='p' mb='1rem'>
              Para efetuar o seu cadastro será necessário anexar:
            </Text>
            <Text as='p'>
              - CPF.
            </Text>
            <Text as='p'>
              - RG
            </Text>
            <Text as='p'>
              - ou CNH
            </Text>
            <Text as='p'>
              - Comprovante de Residência (Domicílio em Anápolis)
            </Text>
            <Text as='p' mb='1rem'>
              - Idade mínima 18 anos
            </Text>
            <Text as='p' mb='1rem'>
              E estar de acordo com o Termo de Responsabilidade:
            </Text>
            <Text as='p'>
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
    </>
  )
}
