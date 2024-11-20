import { Box, Text, Avatar, AvatarImage, Pressable} from "@gluestack-ui/themed";
import { BotaoListaSeguidores, BotaoSeguir } from "./PerfilBotoes";
import { Provider } from "react-redux";
import store from "../../redux/storeProvider";
import { usuarioIcon } from "./PerfilComponents";

interface ICartaoUsuarioProps{
    cor?: string,
    corSecundaria?: string,
    usuario: any,
    usuarioRenderizadoNoCartao: any,
    vemDeLista: boolean,
    seguir?: boolean
}

export default function CartaoUsuario({cor="$lightSeis", corSecundaria="$lightSete", usuario, usuarioRenderizadoNoCartao, vemDeLista, seguir=true, ...rest}: ICartaoUsuarioProps){
    return(
        <Provider store={store}>
            <Pressable w={120} bg={cor} rounded={15} alignItems="center" py={10} {...rest}>
                <Box alignItems="center" mb={2}>
                    <Avatar>
                        <AvatarImage source={usuarioRenderizadoNoCartao.fotoPerfil || usuarioIcon} bg={corSecundaria} alt='foto do usuário'/>
                    </Avatar>
                    <Text color="$white" fontFamily="Poppins_700Bold" textAlign="center">{usuarioRenderizadoNoCartao.nomeCompleto}</Text>
                    <Text color="$white" opacity='$80' fontFamily="Poppins_500Medium" textAlign="center" fontSize={12}>{usuarioRenderizadoNoCartao.tag}</Text>
                </Box>
                {usuario.id!==usuarioRenderizadoNoCartao.userId && (
                    <Box flexDirection="row" justifyContent="space-around" bg={corSecundaria} rounded={15} w="70%" py='$1' >
                        {seguir && <BotaoSeguir w={25} h={25} rounded={20} imgW={10.5} imgH={8.5} id1={usuario.id} id2={usuarioRenderizadoNoCartao.userId} usuarioLogado={usuario} nomeCompleto={usuarioRenderizadoNoCartao.nomeCompleto}/>}
                        {!vemDeLista && <BotaoListaSeguidores w={25} h={25} rounded={20} imgW={10} imgH={10} getUsuario={usuarioRenderizadoNoCartao}/>}
                    </Box>
                )}
            </Pressable>
        </Provider>
    )
}