import { Box, Image, styled } from "@gluestack-ui/themed"

const iconSeguir = require('../assets/SeguirIcon.png')
const iconListaSeguidores = require('../assets/ListaIcon.png')

const StyledImageSeguir = styled(Image, {
    w: 11,
    h: 9
})
const StyledImageLista = styled(Image, {
    w: 11,
    h: 11
})

export function BotaoSeguir(){
    return(
        <Box w={25} h={25} bg="$lightTres" borderWidth={1} borderColor="$black" rounded={15} justifyContent="center" alignItems="center">
            <StyledImageSeguir source={iconSeguir} />
        </Box>
    )
}
export function BotaoListaSeguidores(){
    return(
        <Box w={25} h={25} bg="$lightDois" borderWidth={1} borderColor="$black" rounded={15} justifyContent="center" alignItems="center">
            <StyledImageLista source={iconListaSeguidores} />
        </Box>
    )
}