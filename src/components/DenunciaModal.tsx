import { Box, Divider, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Text } from "@gluestack-ui/themed";
import { Titulo } from "./Texto";
import { MultiLinhaInputPerfil } from "./InputPerfil";
import BotaoSecao from "./BotaoSecao";

export default function DenunciaModal(){
    return(
        <Modal isOpen={false}>
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
                        <BotaoSecao w="100%" h={60}>
                            Confirmar
                        </BotaoSecao>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    )
}