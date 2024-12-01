import { Box, Image, Pressable, Text, useToast } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";
import { BotaoExcluirComentario } from "../botao/BotoesPostComentario";
import { usuarioIcon } from "../perfil/PerfilComponents";
import { excluirComentario } from "../../utils/postUtils";
import { useSelector } from "react-redux";
import { abrirToast } from "../geral/ToastMoots";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LazyImage } from "../geral/LazyImage";
import { useState } from "react";
import { BareLoading } from "../geral/Loading";
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

//ao implementar lógica, deixar todos como obrigatórios
interface IComentarioProps{
    fotoPerfil: string,
    tag: string,
    conteudo: string,
    comentarioId: number,
    postId: number,
    userId: number,
    onComentarioExcluido: ()=>void
}


export default function Comentario({fotoPerfil, tag, conteudo, comentarioId, postId, userId, onComentarioExcluido, ...rest}: IComentarioProps){
    const toast = useToast()
    const navigation = useNavigation()

    const tagUsuarioLogado = useSelector(state => state.usuario.user.tag)

    const [excluindoComentario, setExcluindoComentario] = useState<boolean>(false)

    const opacity = useSharedValue(1)

    const handleExcluirComentario=async()=>{
        Alert.alert('Excluir comentário', 'Tem certeza que deseja excluir seu comentário?', [
            {
                text: 'Sim',
                onPress : async()=>{
                    const res = await excluirComentario(comentarioId, postId)
                    if(res.id){
                        setExcluindoComentario(true)
                        opacity.value = withTiming(0, {duration: 300})
                        onComentarioExcluido()
                        abrirToast(toast, 'success', 'Comentário excluído com sucesso.', '', 1000, false)
                        setExcluindoComentario(false)
                    } else abrirToast(toast, 'error', 'Erro ao excluir o comentário. Tente novamente mais tarde.')
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    const handleClickPerfil = () =>{
        navigation.navigate('outro-perfil', {userId})
    }

    return(
        // <Box bg="$white" display="flex" px={10} {...rest}>
            
        // </Box>
        <Animated.View style={[{backgroundColor: '#fff', display: 'flex', paddingHorizontal: 10, marginTop: 10}, {opacity}]}>
            <Box flexDirection="row">
                <Pressable onPress={handleClickPerfil} mr={5}>
                    <LazyImage imagem={fotoPerfil || usuarioIcon} style={{borderRadius: 30, width: 30, height: 30}} />
                </Pressable>
                <Box  flexDirection='row' w='75%'>
                    <TextoNegrito onPress={handleClickPerfil} fontSize={12}>{tag}: </TextoNegrito>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={12} mt={2} >{conteudo}</Text>
                </Box>
            </Box>
            {tag==tagUsuarioLogado && (
                <Box flexDirection="row" justifyContent="flex-end" bottom={5}>
                    {!excluindoComentario ? <BotaoExcluirComentario imgW='$5' imgH='$5' onPress={handleExcluirComentario}/> : <BareLoading />}
                </Box>)}
        </Animated.View>
    )
}