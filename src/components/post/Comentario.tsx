import { Box, Image, Pressable, Text, useToast } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";
import { BotaoCurtirComentario, BotaoDescurtirComentario, BotaoExcluirComentario } from "../botao/BotoesPostComentario";
import { usuarioIcon } from "../perfil/PerfilComponents";
import { excluirComentario } from "../../utils/postUtils";
import { useSelector } from "react-redux";
import { abrirToast } from "../geral/ToastMoots";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LazyImage } from "../geral/LazyImage";

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

    const handleExcluirComentario=async()=>{
        Alert.alert('Excluir comentário', 'Tem certeza que deseja excluir seu comentário?', [
            {
                text: 'Sim',
                onPress : async()=>{
                    const res = await excluirComentario(comentarioId, postId)
                    if(res.id){
                        onComentarioExcluido()
                        abrirToast(toast, 'success', 'Comentário excluído com sucesso.', '', 1000, false)
                    } else abrirToast(toast, 'error', 'Deu erro man')
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
        <Box bg="$white" display="flex" px={10} {...rest}>
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
                    <BotaoExcluirComentario imgW='$5' imgH='$5' onPress={handleExcluirComentario}/>
                </Box>
            )}
        </Box>
    )
}