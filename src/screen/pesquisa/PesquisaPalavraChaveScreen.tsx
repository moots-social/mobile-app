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
                <Box flex={1} justifyContent="space-between">
                    <BarraPesquisa extended={false} valorParam={valor} />
                    <RoundedTop bg="$white" pt={5} pb={40} alignItems="center" h="90%">
                        <Box alignItems="center" h={250}>
                            <Titulo fontFamily="Poppins_500Medium">Perfis</Titulo>
                            {dataPerfil[0] ? (
                                <FlatList data={dataPerfil} renderItem={({item})=>(
                                    <CartaoUsuario usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={false} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item})}} seguir={usuario.id!=item.userId}/>
                                )} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginLeft: 7.5}}/>
                            ): <TextoNegrito fontFamily="Poppins_500Medium">Nenhum perfil encontrado.</TextoNegrito>}
                        </Box>
                        <Divider w="80%" my={10}/>
                        <Box alignItems="center">
                            <Titulo fontFamily="Poppins_500Medium">Publicações</Titulo>
                            {!dataPost ? 
                            <>
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                                <Post />
                            </>: <TextoNegrito fontFamily="Poppins_500Medium" >Nenhuma publicação encontrada.</TextoNegrito>}
                        </Box>
                    </RoundedTop>
                </Box>
            </ScrollView>
        </LinearGradientMoots>
    )
}