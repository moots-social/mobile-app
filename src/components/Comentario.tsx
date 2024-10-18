import { Box, Image, Text } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";
import { BotaoCurtir, BotaoDescurtir } from "./BotoesPostComentario";

const usuarioIcon = require('../assets/UsuarioIcon.png')

//ao implementar lógica, deixar todos como obrigatórios
interface IComentarioProps{
    fotoPerfil?: string,
    tag?: string,
    conteudo?: string,
}

export default function Comentario({fotoPerfil, tag, conteudo, ...rest}: IComentarioProps){
    return(
        <Box bg="$white" display="flex" px={10} {...rest}>
            <Box flexDirection="row" alignItems="center">
                <Image source={usuarioIcon} w={30} h={30} mr={5}/>
                <TextoNegrito fontSize={12}>@{tag}: </TextoNegrito>
                <Text fontFamily="Poppins_600SemiBold" fontSize={12}>{conteudo}</Text>
            </Box>
            <Box flexDirection="row" justifyContent="flex-end" bottom={5}>
                <BotaoCurtir w={14} h={14} mr={5}/>
                <BotaoDescurtir w={14} h={14} />
            </Box>
        </Box>
    )
}