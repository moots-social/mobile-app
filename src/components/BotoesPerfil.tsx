import { Box, Image, styled } from "@gluestack-ui/themed"

const iconSeguir = require('../assets/SeguirIcon.png')
const iconListaSeguidores = require('../assets/ListaIcon.png')

export function BotaoSeguir({imgW=20, imgH=16, ...rest}){
    return(
        <Box bg="$lightTres" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={iconSeguir} w={imgW} h={imgH} m={10}/>
        </Box>
    )
}
export function BotaoListaSeguidores({imgW=16, imgH=16, ...rest}){
    return(
        <Box bg="$lightDois" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={iconListaSeguidores} w={imgW} h={imgH} m={10}/>
        </Box>
    )
}