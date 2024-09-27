import { Box, Text } from '@gluestack-ui/themed'
import { TextoNegrito } from './Texto'

type props = {
    conteudo: string,
    timestamp: string
}

export function MensagemEnviada({conteudo, timestamp}: props) {
  return (
    <Box>
        <Box alignSelf="flex-end" bg="$darkSeis" rounded={30} borderWidth={2} borderColor="$white" flex={1} minHeight={40} minWidth={40} maxWidth="90%" flexWrap="wrap" alignItems="center">
            <TextoNegrito fontFamily="Poppins_500Medium" color="$white" m={2} >{conteudo}</TextoNegrito>
        </Box>
        <Box alignItems="flex-end" pt={5}>
            <TextoNegrito fontFamily="Poppins_500Medium" wordBreak="break-word" fontSize={12}>{timestamp}</TextoNegrito>
        </Box>
    </Box>
  )
}

export function MensagemRecebida() {
  return (
    <Box>
        <Text>oi</Text>
    </Box>
  )
}