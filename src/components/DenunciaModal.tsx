import { Box, Divider, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Text } from "@gluestack-ui/themed";
import { TextoNegrito, Titulo } from "./Texto";
import { MultiLinhaInputPerfil } from "./InputPerfil";
import BotaoSecao from "./BotaoSecao";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface IDenunciaModalProps{
    modalVisivel: boolean
}

export default function DenunciaModal({modalVisivel}: IDenunciaModalProps){
    const navigation = useNavigation()

    const [isModalVisivel, setModalVisivel] = useState<boolean>(modalVisivel)
    const [botaoVisivel, setBotaoVisivel] = useState<boolean>(false)
    const [textoBotaoAcao, setTextoBotaoAcao] = useState<string>('Carregando...')

    const handleAbrir = ()=>{
        setTimeout(()=>{
            setBotaoVisivel(true)
        }, 300)
    }

    const handleFechar = (textoBotao: string)=>{
        setTextoBotaoAcao(textoBotao)
        setBotaoVisivel(false)
        setTimeout(()=>{
            setModalVisivel(false)
        }, 300)
    }

    useEffect(()=>{
        handleAbrir()
    }, [])
    return(
        <Modal isOpen={isModalVisivel} onClose={()=>{handleFechar('Voltando...'); navigation.goBack()}}>
            <ModalBackdrop />
            <ModalContent w="95%" >
                <ModalHeader flexDirection="column">
                    <Titulo>Denunciar publicação</Titulo>
                    <Divider />
                </ModalHeader>
                <Box alignItems="center">
                    <ModalBody>
                        <Text fontFamily="Poppins_500Medium" mt={10}>Nos conte o motivo de denunciar essa publicação. Não se preocupe, o usuário que fez o post não verá sua denúncia.</Text>
                        <MultiLinhaInputPerfil titulo='' placeholder='Escreva o motivo da sua denúncia aqui...'/>
                    </ModalBody>
                    <ModalFooter>
                        {botaoVisivel ? (<BotaoSecao w="100%" h={60} onPress={()=>{
                            handleFechar('Confirmando...')
                            navigation.goBack()
                            }}>
                            Confirmar
                        </BotaoSecao>): <TextoNegrito color="#468B51">{textoBotaoAcao}</TextoNegrito>}
                        
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    )
}