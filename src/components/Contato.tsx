import { Box, Text, Avatar, AvatarFallbackText, AvatarImage, AvatarBadge, styled } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";

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
  return (
    <StyledShadowBox w="95%">
        <Box h={100} bg="$darkCinco" rounded={20} justifyContent="center">
            <Box flexDirection="row" alignItems="center" w="80%" >
                <Box px={20}>
                    <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                        <AvatarFallbackText>Gabriel</AvatarFallbackText>
                        <AvatarBadge bg="$green" borderColor="$green"/>
                    </Avatar>
                </Box>
                <Box justifyContent="space-between" flexDirection="row" width="86%">
                    <Box flexDirection="column">
                        <Box flexDirection="row">
                            <Text fontFamily="Poppins_500Medium" color="$black">{nome}  </Text>
                        </Box>
                        <Box>
                            <Text fontFamily="Poppins_500Medium" >{conteudo}</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Text fontFamily="Poppins_700Bold" fontSize="$2xs" >11:20</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </StyledShadowBox>
  )
}