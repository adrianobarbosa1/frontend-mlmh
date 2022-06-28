import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import {
  Box,
  Text,
  Flex,
  Input as ChakraInput
} from '@chakra-ui/react'
import React from 'react'

export default function formteste() {

  return (

    <Box
      mt='4.4rem'
    >
      <Box m='1rem'>
        <Grid
          templateAreas={
            `"header header"
             "nav main"
             "nav main"`}
          gridTemplateRows={'50px 1fr 470px'}
          gridTemplateColumns={'70% 1fr'}
          h='200px'
          gap='1'
          color='blackAlpha.700'
          fontWeight='bold'
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
            <Flex border='1px solid yellow' direction='column' p='1rem'>
              <div>
                <p>A inscrição no Programa MEU LOTE MINHA HISTÓRIA seguirá todas as regras contidas no Edital,  de acordo com Lei Complementar Municipal nº 493, de 19 de maio de 2022 e Portaria nº.: .. .</p>
                <p>
                  <b>Preencha todos os campos obrigatórios.</b>
                </p>

                <p>Após a conclusão da inscrição será possível alterar os dados, para isso ultilize o número de protocolo da incrição, no prazo estipulado no edital.</p>
              </div>
              <Box
                borderRadius={6}
                bg='red.200'
                p='1rem'

              >


                <div>
                  <b>Não se esqueça de ler o <a
                    href={"https://diario.anapolis.go.gov.br/dowebans/page/diarioOficial.jsf"}
                  >
                    EDITAL </a>do programa antes de realizar sua inscrição</b>
                </div>
                <div>

                  <p>
                    A pessoa que for desclassificada por apresentar dados, informações, declarações ou documentos falsos, não poderá participar de outras inscrições do Programa “Meu Lote, Minha História.
                  </p>

                  <br />
                  <b>Todas as publicações oficiais serão feitas através do Diário Oficial do Município, localizado no site da
                    <a href="https://www.anapolis.go.gov.br/"> Prefeitura de Anápolis</a>.</b>
                </div>
              </Box>

              <Button
                mt='2rem'
                bg='yellowOficial'
                color='text'
              // onClick={onOpen}
              >
                Cadastrar
              </Button>
            </Flex>

          </GridItem>

          <GridItem pl='2' area={'main'}>
            <Flex
              h='470px'
              direction='column'
              align='center'
              justify='center'
              p='1rem'
            >

              <Flex
                direction='column'
                borderRadius='1rem'
                border='1px solid gray'
                boxShadow='md'
                p='1rem'
              >
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

      </Box>
    </Box>
  )
}
