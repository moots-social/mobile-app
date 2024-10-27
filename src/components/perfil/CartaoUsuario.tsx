import { Box, Text, Avatar, AvatarImage} from "@gluestack-ui/themed";
import { BotaoListaSeguidores, BotaoSeguir } from "./PerfilBotoes";
import { usuarioIcon } from "./PerfilComponents";

interface ICartaoUsuarioProps{
    cor?: string,
    corSecundaria?: string
}

export default function CartaoUsuario({cor="$lightSeis", corSecundaria="$lightSete", ...rest}: ICartaoUsuarioProps){
    return(
    <Box w={100} h={120} bg={cor} rounded={15} alignItems="center" {...rest}>
        <Box alignItems="center" mt={5}>
            <Avatar >
                <AvatarImage source={usuarioIcon} bg={corSecundaria} alt='foto do usuário'/>
            </Avatar>
            <Text color="$white" fontFamily="Poppins_700Bold">Usuario</Text>
        </Box>
        <Box flexDirection="row" bg={corSecundaria} rounded={15}>
            <Box m={5} mr={2.5}><BotaoSeguir w={25} h={25} rounded={20} imgW={10.5} imgH={8.5}/></Box>
            <Box m={5} ml={2.5}><BotaoListaSeguidores w={25} h={25} rounded={20} imgW={10} imgH={10}/></Box>
        </Box>
    </Box>
    )
}