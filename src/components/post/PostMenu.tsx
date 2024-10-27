import { Image, Menu, MenuItem, MenuItemLabel, Pressable, Box, Divider, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Text } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { TextoNegrito, Titulo } from "../geral/Texto"
import { MultiLinhaInputPerfil } from "../geral/InputPerfil"
import BotaoSecao from "../botao/BotaoSecao"

const menuIcon = require('../../assets/MenuIcon.png')

export function MenuPost(){
    const navigation = useNavigation()
    const [isModalVisivel, setModalVisivel] = useState<boolean>(false)
    const [botaoVisivel, setBotaoVisivel] = useState<boolean>(false)
    const [textoBotaoAcao, setTextoBotaoAcao] = useState<string>('')

    const handleAbrir = (textoBotao: string)=>{
        setTextoBotaoAcao(textoBotao)
        setModalVisivel(true)
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
    return(
        <Box>

        <Menu trigger={({ ...triggerProps})=>{
            return(
                <Pressable {...triggerProps} bg="$white" h={25}>
                    <Image source={menuIcon} size="2xs" alt='menu'/>
                </Pressable>
            )
            }}>
            <MenuItem key="VerPerfil" textValue="VerPerfil" onPress={()=>navigation.navigate('perfil')}>
                <MenuItemLabel>Visitar perfil</MenuItemLabel>
            </MenuItem>
            <MenuItem key="Denunciar" textValue="Denunciar" onPress={()=>handleAbrir('Carregando...')}>
                <MenuItemLabel>Denunciar publicação</MenuItemLabel>
            </MenuItem>
        </Menu>
                <Modal isOpen={isModalVisivel} onClose={()=>handleFechar('Voltando...')}>
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
                                }}>
                                Confirmar
                            </BotaoSecao>): <TextoNegrito color="#468B51">{textoBotaoAcao}</TextoNegrito>}
                            
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    )
}