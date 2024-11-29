import { Image, Menu, MenuItem, MenuItemLabel, Pressable, Box, Divider, Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, useToast, MenuIcon, TrashIcon, ExternalLinkIcon, AlertCircleIcon } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { TextoNegrito, Titulo } from "../geral/Texto"
import { MultiLinhaInputPerfil } from "../geral/InputPerfil"
import BotaoSecao from "../botao/BotaoSecao"
import { useSelector } from "react-redux"
import { abrirToast} from "../../components/geral/ToastMoots";
import postUtils, { excluirPost } from "../../utils/postUtils"
import { LazyIcon } from "../geral/LazyImage"

const menuIcon = require('../../assets/MenuIcon.png')

interface IPropsMenu{
    userId: number,
    postId: number,
    setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuPost({userId, postId}: IPropsMenu){
    const usuario = useSelector((state)=> state.usuario.user)
    const toast = useToast()
    const navigation = useNavigation()
    const [denuncia, setDenuncia] = useState<string>('')
    const postUsuarioLogado: boolean = userId == usuario.userId
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

    const handleExcluirPost = async() =>{
        const res = await excluirPost(postId)
        if(res!==0){
            abrirToast(toast, 'success', `Post ${postId} excluído com sucesso`, '', 1000, false)
        } else abrirToast(toast, 'error', `Não foi possível excluir esse post.`, '', 1000, false)
    }

    const handleNavigatePerfil = () =>{
        if(userId == usuario.userId) navigation.navigate('perfil')
        else navigation.navigate('outro-perfil', {userId})
    }

    const handleEnviarDenuncia = async()=>{
        if(denuncia==='') abrirToast(toast, 'error', 'Você não pode enviar uma denúncia sem conteúdo. Digite um motivo para estar denunciando esta publicação.')
        else{
            const resultado = await postUtils.denunciarPost(postId, denuncia)
            if(resultado === 200){
                handleFechar('Confirmando...')
                setDenuncia('')
                abrirToast(toast, 'success', 'Publicação denunciada com sucesso.', '', 1000, false)
            } else abrirToast(toast, 'error', 'Não foi possível denunciar a publicação. Tente novamente.')
        }
    }

    return(
        <Box>  

        <Menu trigger={({ ...triggerProps})=>{
            return(
                <Pressable {...triggerProps} bg="$white" h={25}>
                    <LazyIcon imagem={menuIcon} style={{width: 28, height: 28}}/>
                </Pressable>
            )
            }}>
            <MenuItem key="VerPerfil" textValue="VerPerfil" onPress={handleNavigatePerfil}>
                <MenuIcon as={ExternalLinkIcon} mr='$1'/>
                <MenuItemLabel>Visitar perfil</MenuItemLabel>
            </MenuItem>
            {userId != usuario.userId  ? (
            <MenuItem key="Denunciar" textValue="Denunciar" onPress={()=>handleAbrir('Carregando...')}>
                <MenuIcon as={AlertCircleIcon} mr='$1'/>
                <MenuItemLabel>Denunciar publicação</MenuItemLabel>
            </MenuItem>
            ) : (
                <MenuItem key="Excluir" textValue="Excluir" onPress={()=>handleExcluirPost()}>
                <MenuIcon as={TrashIcon} mr='$1'/>
                <MenuItemLabel>Excluir publicação</MenuItemLabel>
            </MenuItem>
            )}
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
                            <MultiLinhaInputPerfil titulo='' placeholder='Escreva o motivo da sua denúncia aqui...' onChange={(text)=>setDenuncia(text)}/>
                        </ModalBody>
                        <ModalFooter>
                            {botaoVisivel ? (<BotaoSecao w="100%" h={60} onPress={handleEnviarDenuncia}>
                                Confirmar
                            </BotaoSecao>): <TextoNegrito color="#468B51">{textoBotaoAcao}</TextoNegrito>}
                            
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    )
}