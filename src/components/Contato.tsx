import { Box, Button, Text, Avatar, AvatarFallbackText, AvatarBadge, AvatarImage,  styled } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";
import { Pressable } from "react-native";
const perfilIcon = require('../assets/UsuarioIcon.png')

type propsType = {
    nome: string,
    navigation: any,
    conteudo?: string,
    timestamp?: string
}


export const StyledShadowBox = styled(Box, {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 30,
    overflow: "hidden",
});

export default function Contato({nome, navigation, conteudo, timestamp}: propsType) {
  return (
    <Pressable onPress={()=>navigation.navigate('chat', {id: '1_2'})} style={{marginTop: 10}}>
        <StyledShadowBox>
            <Box h={100} bg="$darkCinco" justifyContent="center" rounded={20}>
                <Box flexDirection="row" alignItems="flex-start" w="80%" >
                    <Box px={20}>
                        <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                            <AvatarImage source={perfilIcon}/>
                            <AvatarBadge bg="$green" borderColor="$green"/>
                        </Avatar>
                    </Box>
                    <Box justifyContent="space-between" flexDirection="row" width="86%">
                        <Box flexDirection="column">
                            <Box flexDirection="row">
                                <Text fontFamily="Poppins_500Medium" color="$black">{nome}</Text>
                            </Box>
                            <Box>
                                <Text fontFamily="Poppins_500Medium" >{conteudo}</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Text fontFamily="Poppins_700Bold" fontSize="$2xs" >{timestamp}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledShadowBox>
    </Pressable>
  )
}