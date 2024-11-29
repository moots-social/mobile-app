import BarraPesquisa from "../../components/barra/BarraPesquisa";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { Box, Divider, ScrollView, FlatList, VirtualizedList } from "@gluestack-ui/themed";
import { RoundedTop } from "../../components/geral/Rounded";
import CartaoUsuario from "../../components/perfil/CartaoUsuario";
import { TextoNegrito, Titulo } from "../../components/geral/Texto";
import { useSelector } from "react-redux";
import VirtualizedPosts from "../../components/geral/VirtualizedPosts";

export default function PesquisaPalavraChave({navigation, route}: any){

    const {valor, dataPerfil, dataPost} = route.params
    const usuario = useSelector((state)=> state.usuario.user)
    const filtros = useSelector(state=> state.usuario.filtros)
    
    return(
        <LinearGradientMoots>
            <ScrollView>
                <Box flex={1}>
                    <BarraPesquisa extended={false} valorParam={valor} mb={20}/>
                    <RoundedTop bg="$white" pt={5} pb={20} alignItems="center" $base-minHeight={800} $md-minHeight={1200}>
                        <Box alignItems="center" minHeight={100}>
                            <Titulo fontFamily="Poppins_500Medium">Perfis</Titulo>
                            <Box flexDirection="row" flexWrap="wrap" gap={5} ml={7.5}>
                            {dataPerfil && dataPerfil.length>0 ? dataPerfil.map((item)=>{
                                return <CartaoUsuario usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={false} onPress={()=>{navigation.navigate('outro-perfil', {userId: item.userId})}} seguir={usuario.id!=item.userId}/>
                                    }): <TextoNegrito fontFamily="Poppins_500Medium">{filtros.radioGeral!=='publicacoes' ? 'Nenhum perfil encontrado.' :
                                        'Filtro para buscar apenas publicações ativado.'}</TextoNegrito>}
                            </Box>
                        </Box>
                        <Divider w="80%" my={10}/>
                        <Box alignItems="center" minHeight={545}>
                            <Titulo fontFamily="Poppins_500Medium">Publicações</Titulo>
                            {dataPost && dataPost.length>0 ? (
                                <VirtualizedPosts localDeRenderizacao="pesquisa" dataPost={dataPost} userId={0} refreshState={false}/>
                            ): <TextoNegrito fontFamily="Poppins_500Medium" >{filtros.radioGeral!=='usuarios' ? 'Nenhuma publicação encontrada.' :
                                'Filtro para buscar apenas usuários ativado.'}</TextoNegrito>}
                        </Box>
                    </RoundedTop>
                </Box>
            </ScrollView>
        </LinearGradientMoots>
    )
}