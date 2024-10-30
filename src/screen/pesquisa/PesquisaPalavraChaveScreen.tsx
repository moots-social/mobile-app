import BarraPesquisa from "../../components/barra/BarraPesquisa";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { FlatList, ScrollView } from "@gluestack-ui/themed";
import { RoundedBottom } from "../../components/geral/Rounded";
import CartaoUsuario from "../../components/perfil/CartaoUsuario";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { Titulo } from "../../components/geral/Texto";

export default function PesquisaPalavraChave({navigation, route}: any){
    const {valor, dataPerfil} = route.params
    const {usuario} = useUsuarioContext()
    return(
        <LinearGradientMoots>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <BarraPesquisa extended={false} valorParam={valor} zIndex={1}/>
                {dataPerfil[0] && (
                    <RoundedBottom bg="$white" zIndex={0} bottom={5} pt={5} pb={40} alignItems="center">
                        <Titulo>Perfis</Titulo>
                        <FlatList data={dataPerfil} renderItem={({item})=>(
                            <CartaoUsuario usuario={usuario} usuarioRenderizadoNoCartao={item} vemDeLista={false} onPress={()=>{navigation.navigate('outro-perfil', {outroUsuario: item})}} seguir={usuario.id===item.userId}/>
                        )} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', gap: 5}}/>
                    </RoundedBottom>
                )}
            </ScrollView>
        </LinearGradientMoots>
    )
}