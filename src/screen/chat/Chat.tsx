
import { useRoute } from '@react-navigation/native'
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import { MensagemEnviada, MensagemRecebida } from '../../components/Mensagem'

export default function Chat({navigation}) {
  return (
    <Box bg="$darkQuatro" h="100%">
      <CabecalhoUsuario paginaContatos={false} navigation={navigation} nome="João Paulo"/>
      <Box px={10} py={10}>
        <MensagemEnviada conteudo="oi estou testando tudotudo tudo tudo tudo aaaaaaaaaaa" timestamp="9:27" />
      </Box>
    </Box>
  )
}