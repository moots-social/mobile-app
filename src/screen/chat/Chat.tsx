
import { useRoute } from '@react-navigation/native'
import { Box, ScrollView} from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import { MensagemEnviada, MensagemRecebida } from '../../components/Mensagem'
import BarraEnviarMensagem from '../../components/BarraEnviarMensagem'

export default function Chat({navigation}: any) {
  return (
    <Box bg="$darkQuatro" h="100%">
      <CabecalhoUsuario paginaContatos={false} navigation={navigation} nome="João Paulo"/>
      <ScrollView>
        <Box px={20} pt={20} pb={15}>
          <MensagemEnviada conteudo="Bom dia!" timestamp="9:27" />
        </Box>
        <Box px={20} pb={15}>
          <MensagemEnviada conteudo="Tudo bem?" timestamp="9:27" />
        </Box>
        <Box px={20} pb={15}>
          <MensagemEnviada conteudo="Você poderia fazer aquela coisa que eu te pedi mais cedo?" timestamp="9:28" />
        </Box>
        <Box px={20} pb={15}>
          <MensagemEnviada conteudo="Você poderia fazer aquela coisa que eu te pedi mais cedo?" timestamp="9:28" />
        </Box>
        <Box px={20} pb={15}>
          <MensagemRecebida conteudo="fica c um aspecto esquisito mas funciona" timestamp="9:34" />
        </Box>
        <Box px={20} pb={15}>
          <MensagemRecebida conteudo="testa" timestamp="9:34" />
        </Box>
        <Box>
        </Box>
      </ScrollView>
      <Box py={5}>
          <BarraEnviarMensagem/>
      </Box>
    </Box>
  )
}