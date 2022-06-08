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
  Switch
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [switchOpen, setSwitchOpen] = useState(false)
  const router = useRouter();

  return (
    <>
      <Flex
        w='100%'
        h='40rem'
        pt='5rem'
        background='url(/img/background.png) center/cover no-repeat'
        direction='column'
        align='center'
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
          Use these awesome forms to login or create new account in your project
          for free.
        </Text>
        <Button
          bg='yellowOficial'
          color='text'
          onClick={onOpen}
        >
          Cadastrar
        </Button>

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
      </Flex>

    </>
  )
}
