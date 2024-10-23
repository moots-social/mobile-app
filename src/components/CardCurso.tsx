import { Box, Image } from "@gluestack-ui/themed";
import LinearGradientMoots, { LinearGreenGradientMoots } from "./LinearGradientMoots";
import { TextoNegrito, Titulo } from "./Texto";
import CartaoUsuario from "./CartaoUsuario";
import BotaoSecao from "./BotaoSecao";

const desenvolvimentoIcon = require('../assets/vectorizedDesenvolvimento.png')

export default function CardCurso({curso, ...rest}){
    return(
        <Box  w={350} h={734} bg="#CACACA"{...rest}>
            <LinearGreenGradientMoots>
                <Box alignItems="center" h="100%" rounded={15}  py={40} borderWidth={2} borderColor="$black">
                    <Image source={desenvolvimentoIcon} size="xl"/>
                    <Titulo textAlign="center" fontSize={20}>Essa pessoa realiza o curso de Desenvolvimento</Titulo>
                    <TextoNegrito fontSize={12}>Encontre mais pessoas realizando esse curso:</TextoNegrito>
                    <Box w="100%" bg="$lightSete" py={15} px={20} rounded={15}>
                        <CartaoUsuario />
                    </Box>
                    <BotaoSecao>
                        Fechar
                    </BotaoSecao>
                </Box>
            </LinearGreenGradientMoots>
        </Box>
    )
}