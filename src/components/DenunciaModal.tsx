import { Box, Divider, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Text } from "@gluestack-ui/themed";
import { Titulo } from "./Texto";
import { MultiLinhaInputPerfil } from "./InputPerfil";
import BotaoSecao from "./BotaoSecao";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface IDenunciaModalProps{
    modalVisivel: boolean
}

export default function DenunciaModal({modalVisivel}: IDenunciaModalProps){
    const navigation = useNavigation()

    const [isModalVisivel, setModalVisivel] = useState<boolean>(modalVisivel)
    const [botaoVisivel, setBotaoVisive] = useState<boolean>(true)

    

    return(
        <Modal isOpen={isModalVisivel} onClose={()=>{setModalVisivel(false); navigation.goBack()}}>
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
                        {}
                        <BotaoSecao w="100%" h={60} onPress={()=>{
                            setIsOpen(false)
                            navigation.goBack()
                            }}>
                            Confirmar
                        </BotaoSecao>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    )
}