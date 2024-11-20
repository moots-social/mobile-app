import { Box, Image, Pressable, useToast } from "@gluestack-ui/themed"
import { FullRounded } from "../geral/Rounded"
import { TextoNegrito } from "../geral/Texto"
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Alert } from "react-native"
import { abrirToast } from "../geral/ToastMoots"
import notificacaoUtils from "../../utils/notificacaoUtils"
import { useNavigation } from "@react-navigation/native"


const fecharIcon = require('../../assets/FecharIcon.png')
const usuarioIcon = require('../../assets/UsuarioIcon.png')

export default function Notificacao({notificacao, onNotificacaoExcluida, ...rest}){
    const toast = useToast()
    const navigation = useNavigation()
    const [evento, setEvento] = useState<string>('')
    const handlePress = () => {
        switch (notificacao.evento) {
            case 'Seguiu':
              navigation.navigate('outro-perfil', { userId: notificacao.userId });
              break
            default:
                navigation.navigate('expandido', {postId: notificacao.postId})
                break          
            }
    }
    useEffect(()=>{
        const handleAcao = () =>{
            const {evento} = notificacao
            if(evento==='Seguiu') setEvento('seguiu você.')
            else if(evento==='Curtiu') setEvento('curtiu sua publicação.')
            else if(evento==='Comentou') setEvento('comentou na sua publicação.')
        }
        handleAcao()
    }, [])

    const handleExcluirNotificacao = async() =>{
        Alert.alert('Excluir notificação', 'Tem certeza que deseja excluir essa notificação?', [
            {
                text: 'Sim',
                onPress: async()=>{
                    const res = await notificacaoUtils.excluirNotificacao(notificacao.notificationId)
                    if (res===200){
                        onNotificacaoExcluida(notificacao.id)
                        abrirToast(toast, 'success', 'Notificação excluída com sucesso.', '', 1000, false)
                        
                    } 
                    else abrirToast(toast, 'error', 'Tivemos alguns problemas ao deletar sua notificação. Tente novamente.')
                }
            },
            {
                text: 'Não'
            }
        ])
    }
    return(
        <Pressable onPress={handlePress} >
            <FullRounded bg="$white" p='$2.5' {...rest}>
                <Pressable alignSelf="flex-end" p='$1' onPress={handleExcluirNotificacao}>
                    <Image source={fecharIcon} w='$2.5' h='$2.5' alt='fechar'/>
                </Pressable>
                <Box flexDirection="row" alignItems="center" mb='$2.5' ml='$2.5'>
                    {/* <Box mr={10}>
                        <Image source={usuarioIcon} w={40} h={40} alt='foto da notificação'/>
                    </Box> */}
                    <Box w="85%">
                        <TextoNegrito flexWrap="wrap" >{notificacao.userTag} {evento}</TextoNegrito>
                    </Box>
                </Box>
            </FullRounded>
        </Pressable>
    )
}