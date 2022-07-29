import { Flex, Text, Center } from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PerguntasRespotas() {
    return (
        <>
            <Header />
            <Flex
                w='100%'
                px={{ base: '0', md: '2' }}
                my='6'
            >
                <Flex
                    as='form'
                    flex='1'
                    bg='#fff'
                    p='4'
                    boxShadow='dark-lg'
                    rounded='xl'
                    direction={'column'}
                    align='center'
                >
                    <Center>
                        <Text mb='2rem'>
                            <b>
                                PERGUNTAS E RESPOSTAS
                                MEU LOTE MINHA HISTÓRIA
                            </b>
                        </Text>
                    </Center>
                    <Text>
                        <b>1 - O QUE É O PROGRAMA MEU LOTE MINHA HISTÓRIA?</b><br />
                        R: É um Programa de Habitação Popular, criado pela gestão
                        municipal de Anápolis por meio da Lei Completar 493 de
                        19 de maio de 2022. O Programa destinará 2800 (dois mil e oitocentos)
                        lotes aos cidadãos anapolinos ou moradores que
                        reside em Anápolis a pelo menos 5 (cinco)   anos
                        consecutivos, que tenha idade mínima de 18 anos,
                        com renda familiar bruta de zero a um salário mínimo e
                        meio, e que nenhum membro do grupo  familiar de 18 anos
                        ou mais não poderão, nos últimos 12 (doze) meses que antecedem a
                        inscrição, ser ou terem sido detentores de financiamento no
                        âmbito do sistema financeiro de Habitação e nem proprietários
                        de outro imóvel urbano ou rural. O Programa Meu Lote,
                        Minha História terá os critérios estabelecidos por meio do
                        Edital de Chamamento Público Nº 001/2022.<br /><br />
                        <b> 2 - QUEM PODE SE INSCREVER?</b><br />
                        Poderá se inscrever para seleção pública e adesão ao Programa Social de Habitação Popular “Meu Lote, Minha História”, o interessado que se enquadrar nas seguintes condições:
                        Possuir idade mínima de 18 (dezoito) anos;
                        Possuir renda familiar mensal bruta mínima de 0 (zero) e no máximo 1 (um) salário mínimo e meio;
                        O inscrito e qualquer membro maior de 18 (dezoito) anos do grupo familiar não poderão ter sido beneficiados anteriormente em Programas Habitacionais e no Programa Minha Casa Minha Vida.
                        O inscrito e qualquer membro de 18 (dezoito) anos ou mais do grupo familiar não poderão ser detentores de financiamento no âmbito do Sistema Financeiro de Habitação e não serem possuidores ou proprietários de outro imóvel urbano ou rural, seja ou não registrado no devido serviço notarial, cuja verificação
                        Residir no município de Anápolis há pelo menos 5 (cinco) anos consecutivos e ininterruptos, em período anterior a inscrição, mediante ato autodeclaratório e posteriormente confirmado na fase de visitas técnicas, com apresentação de documentos oficiais.<br /><br />

                        <b>3 – SERÁ OBRIGATÓRIO O CADASTRO ÚNICO PARA A INSCRIÇÃO NO PROGRAMA MEU LOTE, MINHA HISTÓRIA?</b><br />
                        R: Não será obrigatório ter cadastro único para se inscrever no Programa Meu Lote, Minha História.<br /><br />

                        <b>4 - AS INSCRIÇÕES SERÃO FEITAS COMO?</b><br />
                        R: As inscrições serão realizadas exclusivamente, via Internet, no portal do Programa, pelo site www.anapolis.go.gov.br/meuloteminhahistoria a partir do dia 19 de julho de 2022, encerrando-se às 23h59 do dia 16 de setembro de 2022, e deverão ser realizadas mediante preenchimento dos dados solicitados pelo sistema e de seus anexos. Não serão aceitas inscrições efetuadas de forma diversa da estabelecida no edital.
                        A inscrição poderá ser realizada pelo próprio interessado, por seu representante legal ou por qualquer pessoa do núcleo familiar.
                        O candidato deverá preencher todas as informações solicitadas pelo Portal. As informações serão pontuadas conforme critérios definidos em Edital.<br /><br />

                        <b>5 - É PERMITIDO MAIS DE UM CANDIDATO DO MESMO GRUPO FAMILIAR?</b><br />

                        R: NÃO, a inscrição deverá ser feita apenas no nome do candidato interessado na presente seleção, não sendo admitida mais de uma inscrição por grupo familiar.
                        No caso de duas ou mais inscrições de pessoas inseridas no mesmo grupo familiar, todos os inscritos do mesmo núcleo familiar serão desclassificados.<br /><br />

                        <b>6 - APÓS FINALIZAR O CADASTRO, POSSO ALTERAR AS INFORMAÇÕES DECLARADAS?</b><br />
                        R: Serão permitidas alterações nas informações declaradas no período de 25 de julho de 2022 a 16 de setembro de 2022.  Depois de finalizados o período de inscrições, será permitido ao candidato somente a alteração de endereço, e-mail e número de telefone.<br /><br />
                        <b>7 - O QUE É GRUPO FAMILIAR?</b><br />
                        R: O grupo familiar é composto pelo requerente, o cônjuge ou companheiro, os pais e, na ausência de um deles, a madrasta ou o padrasto, os irmãos solteiros, os filhos e enteados solteiros e os menores tutelados, desde que vivam sob o mesmo teto.<br /><br />
                        <b>8 - O QUE É RENDA FAMILIAR?</b><br />
                        R: A renda bruta é o somatório da renda individual dos componentes do mesmo grupo familiar.<br /><br />
                        <b>9- O QUE É PROTOCOLO DE INSCRIÇÃO, QUAL IMPORTÂNCIA DO PROTOCOLO?</b><br />
                        R: Protocolo é o número gerado no final da inscrição, o protocolo é pessoal e intransferível.  É com o número de protocolo que o candidato poderá acompanhar situação, classificação e atualizar informações individuais como endereço, e-mail e telefone, entrar com recursos se for necessário. Por isso é importantíssimo anotar ou imprimir o seu número de protocolo.<br /><br />
                        <b>10 - DOCUMENTOS NECESSÁRIOS PARA INSCRIÇÃO?</b><br />
                        Prova de identificação do candidato e de todos os membros do Grupo Familiar: RG e CPF para membros maiores de 18 anos; e/ou Certidão de Nascimento para crianças e adolescentes;
                        Comprovante de endereço em nome próprio ou em nome de algum dos membros do Grupo Familiar;
                        Certidão de casamento ou Declaração de união estável;
                        Laudo médico comprobatório de Deficiência;
                        Documento comprobatório de renda do candidato e de todos os membros do Grupo Familiar;
                        Documento comprobatório de violência doméstica: Cópia de inquérito policial; denúncia – Ação Penal; pedido de medida protetiva; Sentença condenatória, todos com data anterior à data do início das inscrições.<br /><br />
                        <b>11 - O QUE É UPLOAD?</b><br />
                        R: Envio de documentos por meio de um terminal local (computador, notebook, celular ou outro dispositivo) para um sistema externo remoto.<br /><br />
                        <b>12 - COMO VAI FUNCIONAR CADA FASE:</b><br />
                        PRIMEIRA: Preenchimento do formulário de inscrição, via internet, que será disponibilizado nos por meio dos endereços eletrônicos www.meuloteminhahistoria.go.gov.br:8089 e www.anapolis.go.gov.br
                        SEGUNDA: Envio de documentos solicitados no edital, pelos habilitados na primeira etapa, Upload por meio do link informado aos interessados através de publicação a ser divulgada no Diário Oficial do município.
                        TERCEIRA: Realização de visita técnica para conferência de documentos e informações.<br /><br />
                        <b>13- RECEBI O LOTE E AGORA?</b><br />
                        R: - O beneficiário do lote terá o prazo de 6 (seis) meses, contados da efetivação do ato de transferência do domínio para início das edificações (para iniciar a construção do imóvel); e de 60 (sessenta) meses para conclusão do imóvel, contados a partir da publicação da Autorização de Construção Precária no Diário Oficial do Município de Anápolis. De acordo com projeto Arquitetônico de no mínimo 50m² e no máximo 80m², conforme padrões constantes do Anexo IV e V da Lei nº 493/2022.<br /><br />
                        <b>14 – QUEM PROCURAR EM CASO DÚVIDAS?</b><br />
                        R: Quem tiver qualquer dúvida ou dificuldade no momento da inscrição, podem acessar o Zap da Prefeitura {'>'} Zap do Social, ou procurar um dos pontos de apoio:<br /><br />

                        <b>CRAS Sul: Av. Pedro Ludovico - Jd. Ana Cláudia. Fone: (62) 3902-1539</b><br /><br />

                        <b>CRAS Leste: Av. Juscelino Kubitscheck, Jd. Alvorada. Fone: (62) 3902-1573</b><br /><br />

                        <b>CRAS Norte: Av. do Estado - Vila Norte (Antiga Casa Brasil). Fone: (62) 3902-2639</b><br /><br />

                        <b>
                            CRAS Leste II: Rua Antônio de Souza Franca, Q.9 Lt. 22 Conjunto Habitacional Filostro Machado Carneiro. Fone: (62) 3902-1725
                        </b><br /><br />

                        <b>CREAS: Rua General Joaquim Inácio nº 196 – Centro. Fone: 62 3902-2662 / 0800 646 1117</b><br /><br />
                        <b> As equipes estarão preparadas para sanar as dúvidas durante o período de inscrição 19 de julho até 16 de setembro de 2022.</b><br /><br />


                    </Text>
                    <Center>
                        <Link href="/" >
                            <Text
                                color="blue.500"
                                fontSize='xl'
                                mb='4rem'
                                cursor={'pointer'}

                            >
                                Voltar para tela inicial</Text>

                        </Link>
                    </Center>
                </Flex>
            </Flex >
            <Footer />
        </>
    )
}