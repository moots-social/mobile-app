import { Box, Text, Image } from "@gluestack-ui/themed"
import { Pressable } from "react-native"

const perfilIcon = require('../assets/userDefault.png')
const BackButton =  require('../assets/backButton.png')

type props = {
    nome?: string,
    paginaContatos?: boolean,
    navigation?: any
}

export default function CabecalhoUsuario({nome='Você', paginaContatos=true, navigation}: props) {
  return <Box bg="$white" flexDirection="row"  w="100%" h={90}>
            <Box justifyContent="center" pl={20} w="33.3%">
                {!paginaContatos && (
                    <Pressable onPress={()=>navigation.navigate('tabs')}>
                        <Image source={BackButton} size="2xs"/>
                    </Pressable>
                )}
            </Box>
            <Box w="33.3%" justifyContent="center" alignItems="center">
                <Image source={perfilIcon} size="xs"/>
                <Text fontFamily="Poppins_500Medium" mt={10}>{nome}</Text>
            </Box>
            <Box  w="33.3%" justifyContent="center" alignItems="flex-end">
            </Box>
        </Box>
}