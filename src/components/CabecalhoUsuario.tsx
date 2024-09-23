import { Box, Text, Image } from "@gluestack-ui/themed"
import Leo from '../assets/leo.png'
import BackButton from '../assets/backButton.png'

type props = {
    paginaContatos: boolean
}

export default function CabecalhoUsuario({paginaContatos}: props) {
  return <Box bg="$white" flexDirection="row" justifyContent="space-between" px={20} h={150}>
            <Box justifyContent="center">
                <Image source={BackButton} alt="voltar" size='2xs'/>
            </Box>
            <Box alignSelf="center" alignItems="center">
                <Image source={Leo} size="xs"/>
                <Text fontFamily="Poppins_500Medium" mt={10}>Você</Text>
            </Box>
            <Box justifyContent="center" >
                {!paginaContatos?<Image source={BackButton} alt="voltar" size='2xs'}
            </Box>
        </Box>
}