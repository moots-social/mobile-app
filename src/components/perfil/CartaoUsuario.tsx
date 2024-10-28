import { Box, Text, Avatar, AvatarImage, Pressable} from "@gluestack-ui/themed";
import { BotaoListaSeguidores, BotaoSeguir } from "./PerfilBotoes";
import { usuarioIcon } from "./PerfilComponents";
import { Alert } from "react-native";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { useNavigation } from "@react-navigation/native";

interface ICartaoUsuarioProps{
    cor?: string,
    corSecundaria?: string,
    usuario: any,
    usuarioRenderizadoNoCartao: any,
    vemDeLista: boolean
}

export default function CartaoUsuario({cor="$lightSeis", corSecundaria="$lightSete", usuario, usuarioRenderizadoNoCartao, vemDeLista, ...rest}: ICartaoUsuarioProps){

    return(
    <Pressable w={120} bg={cor} rounded={15} alignItems="center" py={10} {...rest}>
        <Box alignItems="center">
            <Avatar >
                <AvatarImage source={usuarioRenderizadoNoCartao.fotoPerfil || usuarioIcon} bg={corSecundaria} alt='foto do usuário'/>
            </Avatar>
            <Text color="$white" fontFamily="Poppins_700Bold" textAlign="center">{usuarioRenderizadoNoCartao.nomeCompleto}</Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-around" bg={corSecundaria} rounded={15} w="70%" py='$1' >
            <BotaoSeguir w={25} h={25} rounded={20} imgW={10.5} imgH={8.5} id1={usuario.id} id2={usuarioRenderizadoNoCartao.id} nomeCompleto={usuarioRenderizadoNoCartao.nomeCompleto}/>
            {!vemDeLista ? <BotaoListaSeguidores w={25} h={25} rounded={20} imgW={10} imgH={10} getUsuario={usuarioRenderizadoNoCartao}/> : ''}
        </Box>
    </Pressable>
    )
}