import { Box, Image, styled } from "@gluestack-ui/themed"

const iconSeguir = require('../assets/SeguirIcon.png')
const iconListaSeguidores = require('../assets/ListaIcon.png')

export function BotaoSeguir(){
    return(
        <Box bg="$lightTres" borderWidth={1} borderColor="$black" rounded={15} justifyContent="center" alignItems="center">
            <Image size="2xs" source={iconSeguir} />
        </Box>
    )
}
export function BotaoListaSeguidores(){
    return(
        <Box bg="$lightDois" borderWidth={1} borderColor="$black" rounded={15} justifyContent="center" alignItems="center">
            <Image size="2xs" source={iconListaSeguidores} />
        </Box>
    )
}