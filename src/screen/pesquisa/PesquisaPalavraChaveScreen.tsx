import BarraPesquisa from "../../components/barra/BarraPesquisa";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { Box, Divider, FlatList } from "@gluestack-ui/themed";
import { RoundedTop } from "../../components/geral/Rounded";
import CartaoUsuario from "../../components/perfil/CartaoUsuario";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { TextoNegrito, Titulo } from "../../components/geral/Texto";
import Post from "../../components/post/Post";
import { ScrollView } from "react-native-gesture-handler";

export default function PesquisaPalavraChave({navigation, route}: any){
    const {valor, dataPerfil, dataPost} = route.params
    const {usuario} = useUsuarioContext()

    return(
        <LinearGradientMoots>
            <ScrollView>
                <Box flex={1}>
                    <BarraPesquisa extended={false} valorParam={valor} mb={20}/>
                    <RoundedTop bg="$white" pt={5} pb={20} alignItems="center" h="100%">
                        <Box alignItems="center" minHeight={100}>
                            <Titulo fontFamily="Poppins_500Medium">Perfis</Titulo>
                            <Box flexDirection="row" flexWrap="wrap" gap={5} ml={7.5}>
                            {dataPerfil[0] ? dataPerfil.map((item)=>{
                                return <CartaoUsuario usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={false} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item})}} seguir={usuario.id!=item.userId}/>
                                    }): <TextoNegrito fontFamily="Poppins_500Medium">Nenhum perfil encontrado.</TextoNegrito>}
                            </Box>
                        </Box>
                        <Divider w="80%" my={10}/>
                        <Box alignItems="center" minHeight={545}>
                            <Titulo fontFamily="Poppins_500Medium">Publicações</Titulo>
                            {dataPost ? 
                            <>
                                <Post mb={20}/>
                                <Post mb={20}/>
                            </>: <TextoNegrito fontFamily="Poppins_500Medium" >Nenhuma publicação encontrada.</TextoNegrito>}
                        </Box>
                    </RoundedTop>
                </Box>
            </ScrollView>
        </LinearGradientMoots>
    )
}