import { Box, Image } from "@gluestack-ui/themed";
import { FullRounded } from "./Rounded";
import { TextoNegrito } from "./Texto";

const fecharIcon = require('../assets/FecharIcon.png')
const usuarioIcon = require('../assets/UsuarioIcon.png')

export default function Notificacao({...rest}){
    return(
        <FullRounded bg="$white" w="90%" p={10} {...rest}>
            <Box alignSelf="flex-end">
                <Image source={fecharIcon} w={10} h={10}/>
            </Box>
            <Box flexDirection="row" alignItems="center" mb={10} ml={10}>
                <Box mr={10}>
                    <Image source={usuarioIcon} w={40} h={40}/>
                </Box>
                <Box w="85%">
                    <TextoNegrito flexWrap="wrap" >@usuario10 curtiu seu post.</TextoNegrito>
                </Box>
            </Box>
        </FullRounded>
    )
}