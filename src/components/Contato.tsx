import { Box, Button, Text, Avatar, AvatarFallbackText, AvatarBadge, AvatarImage } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";
const perfilIcon = require('../assets/userDefault.png')

type propsType = {
    nome: string,
    navigation: any,
    conteudo?: string,
    timestamp?: string
}

export default function Contato({nome, navigation, conteudo, timestamp}: propsType) {
  return (
    <Button h={100} w="95%" bg="$darkCinco" rounded={20} justifyContent="center" my={10} onPress={()=>navigation.navigate('chat', {id: '1_2'})}>
        <Box flexDirection="row" alignItems="center">
            <Avatar mr={15}>
                <AvatarImage source={perfilIcon}/>
                <AvatarBadge bg="$green"/>
            </Avatar>
            <Box  w="80%">
                <Box flexDirection="row" >
                    <Text fontFamily="Poppins_500Medium" color="$black">{nome}  </Text>
                    <TextoNegrito fontFamily="Poppins_500Medium" fontSize={8}>{timestamp}</TextoNegrito>
                </Box>
                <Box>
                    <Text fontFamily="Poppins_500Medium" >{conteudo}</Text>
                </Box>
            </Box>
        </Box>
    </Button>
  )
}