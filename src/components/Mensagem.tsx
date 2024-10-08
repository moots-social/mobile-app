import { Box } from '@gluestack-ui/themed'
import { TextoNegrito } from './Texto'
import { StyledShadowBox } from '../screen/login/Cadastro'

type props = {
    conteudo: string,
    timestamp: string
}

export function MensagemEnviada({conteudo, timestamp}: props) {
  return (
    <Box>
        <StyledShadowBox display="flex" alignSelf="flex-end" bg="$lightSete" rounded={30} minHeight={40} minWidth={40} maxWidth="90%" flexWrap="wrap" alignItems="flex-end">
            <TextoNegrito fontFamily="Poppins_500Medium"  color="$white" my={2} mx={4} >{conteudo}</TextoNegrito>
        </StyledShadowBox>
        <Box alignItems="flex-end" >
            <TextoNegrito fontFamily="Poppins_500Medium" fontSize={12}>{timestamp}</TextoNegrito>
        </Box>
    </Box>
  )
}

export function MensagemRecebida({conteudo, timestamp}: props) {
  return (
    <Box alignSelf="flex-start">
        <StyledShadowBox display="flex" bg="$white" rounded={30} minHeight={40} minWidth={40} maxWidth="90%" flexWrap="wrap" alignItems="flex-end">
            <TextoNegrito fontFamily="Poppins_500Medium" my={2} mx={4} >{conteudo}</TextoNegrito>
        </StyledShadowBox>
        <Box>
            <TextoNegrito fontFamily="Poppins_500Medium" fontSize={12}>{timestamp}</TextoNegrito>
        </Box>
    </Box>
  )
}