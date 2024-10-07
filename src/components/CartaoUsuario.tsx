import { Box, Text, Avatar, AvatarImage} from "@gluestack-ui/themed";
import { BotaoSeguir, BotaoListaSeguidores } from "./BotoesPerfil";
const perfilIcon = require('../assets/UsuarioIcon.png')


export default function CartaoUsuario({...rest}){
    return(
    <Box w={100} h={120} bg="$lightSeis" rounded={15} alignItems="center"{...rest}>
        <Box alignItems="center" mt={5}>
            <Avatar borderWidth={3} borderColor="$lightSete">
                <AvatarImage source={perfilIcon}/>
            </Avatar>
            <Text color="$white" fontFamily="Poppins_700Bold">Usuario</Text>
        </Box>
        <Box flexDirection="row" bg="$lightSete" rounded={15}>
            <Box m={5} mr={2.5}><BotaoSeguir/></Box>
            <Box m={5} ml={2.5}><BotaoListaSeguidores/></Box>
        </Box>
    </Box>
    )
}