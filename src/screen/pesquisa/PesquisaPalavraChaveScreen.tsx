import BarraPesquisa from "../../components/barra/BarraPesquisa";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { Box, Divider, FlatList } from "@gluestack-ui/themed";
import { RoundedBottom, RoundedTop } from "../../components/geral/Rounded";
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
            <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
                <BarraPesquisa extended={false} valorParam={valor} />
                <RoundedTop bg="$white" pt={5} pb={40} alignItems="center">
                    <Box alignItems="center">
                        <Titulo>Perfis</Titulo>
                        {dataPerfil[0] ? (
                            <FlatList data={dataPerfil} renderItem={({item})=>(
                                <CartaoUsuario usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={false} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item})}} seguir={usuario.id!=item.userId}/>
                            )} contentContainerStyle={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginLeft: 7.5}}/>
                        ): <TextoNegrito>Nenhum perfil encontrado.</TextoNegrito>}
                    </Box>
                    <Divider w="80%" my={10}/>
                    <Box alignItems="center">
                        <Titulo>Publicações</Titulo>
                        {dataPost ? '': <TextoNegrito>Nenhuma publicação encontrada.</TextoNegrito>}
                    </Box>
                </RoundedTop>
            </ScrollView>
        </LinearGradientMoots>
    )
}