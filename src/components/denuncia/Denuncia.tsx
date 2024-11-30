import { Box, useToast } from "@gluestack-ui/themed";
import { FullRounded } from "../geral/Rounded";
import { TextoNegrito } from "../geral/Texto";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import denunciaUtils from "../../utils/denunciaUtils";
import { abrirToast } from "../geral/ToastMoots";
import { Alert } from "react-native";
import { excluirPost } from "../../utils/postUtils";

interface IDenunciaProps{
    postId: number,
    denunciaId: string,
    motivo: string,
    onDenunciaExcluida: ()=>void,
    onPostExcluido: ()=>void
}

export default function Denuncia({postId, denunciaId, motivo, onDenunciaExcluida, onPostExcluido, ...rest}: IDenunciaProps){

    const navigation = useNavigation()
    const toast = useToast()
    const handleVerPost = () =>{
        navigation.navigate('expandido', {postId: postId})
    }

    const handleExcluirDenuncia = async() =>{
        const resultado = await denunciaUtils.excluirDenuncia(denunciaId, postId)
        if(resultado!=0){
            abrirToast(toast, 'success', `Denúncia ${denunciaId} excluída com sucesso`, '', 1000, false)
            onDenunciaExcluida()
        } else abrirToast(toast, 'error', 'Não foi possível excluir a denúncia. Tente novamente.')
    }

    const handleExcluirPost = async()=>{
        Alert.alert('Excluir publicação', 'Tem certeza de que deseja excluir essa publicação? Todas as denúncias relacionadas a ela também serão excluídas.', [
            {
                text: 'Sim',
                onPress: async() => {
                    const res = await excluirPost(postId)
                    if(res!==0){
                        abrirToast(toast, 'success', `Post ${postId} excluído com sucesso`, '', 1000, false)
                        onPostExcluido()
                    } else abrirToast(toast, 'error', `Não foi possível excluir esse post.`, '', 1000, false)
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    return <FullRounded bg='$white' p='$2.5' w='95%' {...rest}>
        <Box flexDirection='row'>
            <TextoNegrito fontFamily='Poppins_400Regular'>ID do post: </TextoNegrito>
            <TextoNegrito>{postId}</TextoNegrito>
        </Box>
        <Box flexDirection="row" mb='$2.5' flexWrap='wrap'>
            <TextoNegrito>{motivo}</TextoNegrito>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
            <TouchableOpacity onPress={handleVerPost}>
                <TextoNegrito>Ver post</TextoNegrito>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExcluirDenuncia}>
                <TextoNegrito color='$lightSete'>Excluir denúncia</TextoNegrito>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExcluirPost}>
                <TextoNegrito color='#CD0000'>Excluir post</TextoNegrito>
            </TouchableOpacity>
            </Box>
    </FullRounded>
}