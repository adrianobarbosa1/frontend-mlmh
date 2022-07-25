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
    Switch,
    Box
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalCadastrar = ({ isOpen, onClose }: ModalProps) => {
    const [switchOpen, setSwitchOpen] = useState(false)

    const router = useRouter();

    return (
        <Modal
            isOpen={isOpen}
            closeOnOverlayClick={false}
            onClose={onClose}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Meu Lote Minha História</ModalHeader>
                <ModalCloseButton onClick={() => setSwitchOpen(false)} />
                <ModalBody>
                    <Text as='p' mb='1rem'>
                        A inscrição no Programa MEU LOTE MINHA HISTÓRIA
                        seguirá EDITAL DE CHAMAMENTO PÚBLICO Nº 001/2022

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
                            onClick={() => router.push('/formcreate')}
                        >
                            Cadastrar
                        </Button>
                    ) : ''}

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}