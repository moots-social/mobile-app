import { Box, Image, Text } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";

const usuarioIcon = require('../../assets/UsuarioIcon.png')

export default function NovoPost(){
    return(
            <LinearGradientMoots>
                <CabecalhoPerfil titulo="Nova publicação" zIndex={1}/>
                <RoundedBottom zIndex={0} minHeight={500} bg="$white" bottom={5}>
                    <Box p={20} display="flex" justifyContent="space-between" minHeight={500}>
                        <Box display="flex">
                            <Box flexDirection="row" alignItems="center">
                                <Image source={usuarioIcon} w={40} h={40}/>
                                <TextoNegrito ml={2}>Usuário</TextoNegrito>
                            </Box>
                            <Box justifyContent="center">
                                <Text fontSize={16} fontFamily="Poppins_500Medium" color="#7D7D7D" ml={48}>No que você está pensando?</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Text>oi</Text>
                            </Box>
                        </Box>
                    </Box>
                </RoundedBottom>
            </LinearGradientMoots>
    )
}