import { Box, Button, Text, Avatar, AvatarFallbackText, AvatarBadge, AvatarImage,  styled } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const perfilIcon = require('../assets/UsuarioIcon.png')


type propsType = {
    nome: string,
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

export default function Contato({nome, conteudo, timestamp}: propsType) {
    const navigation = useNavigation()
    
  return (
    <Pressable onPress={()=>navigation.navigate('chat', {id: '1_2'})} style={{marginTop: 10}}>
        <StyledShadowBox>
            <Box h={100} bg="$lightSeis" justifyContent="center" rounded={20}>
                <Box flexDirection="row" alignItems="flex-start" w="80%" >
                    <Box px={20}>
                        <Avatar bgColor="$lightSete" size="md" borderRadius="$full">
                            <AvatarImage source={perfilIcon}/>
                        </Avatar>
                    </Box>
                    <Box justifyContent="space-between" flexDirection="row" width="86%">
                        <Box flexDirection="column">
                            <Box flexDirection="row">
                                <Text fontFamily="Poppins_500Medium" color="$white">{nome}</Text>
                            </Box>
                            <Box>
                                <Text fontFamily="Poppins_500Medium" color="$white" >{conteudo}</Text>
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                <Text fontFamily="Poppins_700Bold" color="$white" fontSize="$2xs" >{timestamp}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledShadowBox>
    </Pressable>
  )
}