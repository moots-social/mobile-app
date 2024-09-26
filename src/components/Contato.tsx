import { Box, Text } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";

type propsType = {
    nome: string,
    conteudo?: string,
    timestamp?: string
}

export default function Contato({nome, conteudo, timestamp}: propsType) {
  return (
    <Box h={100} w="95%" bg="$darkCinco" rounded={20} justifyContent="center">
        <Box flexDirection="row" alignItems="center">
            <Box px={20}>
                <Box w={50} h={50} bg='$white' rounded={30}></Box>
            </Box>
            <Box w="80%">
                <Box flexDirection="row" >
                    <Text fontFamily="Poppins_500Medium" color="$black">{nome}  </Text>
                    <TextoNegrito fontFamily="Poppins_500Medium" fontSize={8}>{timestamp}</TextoNegrito>
                </Box>
                <Box>
                    <Text fontFamily="Poppins_500Medium" >{conteudo}</Text>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}