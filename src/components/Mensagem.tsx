import { Box, Text } from '@gluestack-ui/themed'
import { TextoNegrito } from './Texto'


type props = {
    conteudo: string,
    timestamp: string
}

export function MensagemEnviada({conteudo, timestamp}: props) {
  return (
    <Box>
        <Box alignSelf="flex-end" bg="$darkSeis" rounded={30} borderWidth={2} borderColor="$white" minHeight={40} minWidth={40} maxWidth="90%" flexWrap="wrap" alignItems="flex-end">
            <TextoNegrito fontFamily="Poppins_500Medium"  color="$white" my={2} mx={4} >{conteudo}</TextoNegrito>
        </Box>
        <Box alignItems="flex-end" >
            <TextoNegrito fontFamily="Poppins_500Medium" fontSize={12}>{timestamp}</TextoNegrito>
        </Box>
    </Box>
  )
}

export function MensagemRecebida({conteudo, timestamp}: props) {
  return (
    <Box alignSelf="flex-start">
        <Box bg="$white" rounded={30} borderWidth={2} borderColor="$black" minHeight={40} minWidth={40} maxWidth="90%" flexWrap="wrap" alignItems="flex-end">
            <TextoNegrito fontFamily="Poppins_500Medium" my={2} mx={4} >{conteudo}</TextoNegrito>
        </Box>
        <Box>
            <TextoNegrito fontFamily="Poppins_500Medium" fontSize={12}>{timestamp}</TextoNegrito>
        </Box>
    </Box>
  )
}