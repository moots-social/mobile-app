import { Box, Text } from "@gluestack-ui/themed";
import { TextoNegrito } from "./Texto";

export default function Contato() {
  return (
    <Box h={100} w="95%" bg="$darkCinco" rounded={20} justifyContent="center">
        {/* <Box w={20} h={20} bg="$darkUm" rounded={30} alignItems="center" alignSelf="flex-end"></Box> */}
        <Box flexDirection="row" alignItems="center">
            <Box px={20}>
                <Box w={50} h={50} bg='$white' rounded={30}></Box>
            </Box>
            <Box>
                <Box flexDirection="row" >
                    <Text fontFamily="Poppins_500Medium" color="$black">Gabriel</Text>
                    <TextoNegrito fontFamily="Poppins_500Medium" fontSize={8}>06/20, 11:20</TextoNegrito>
                </Box>
                    <Text fontFamily="Poppins_500Medium" >Teste</Text>
            </Box>
        </Box>
    </Box>
  )
}