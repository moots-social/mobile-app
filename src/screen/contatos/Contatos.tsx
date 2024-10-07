
import { Box} from '@gluestack-ui/themed'
import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import BotaoNovoChat from '../../components/BotaoNovoChat'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import { RoundedTop } from '../../components/Rounded'

const users = 
  {
    id: '1',
    nome: "Gabriel",
    conteudo: "Bom dia!",
    timestamp: "10:54"
  }


export default function Contatos({navigation}) {
  return(
  <LinearGradientMoots alignItems="center" bg="$white" h="100%">
    <CabecalhoUsuario />
    <RoundedTop bg="$white" mt={20} w="100%" h="100%" alignItems="center">
      <Titulo pb={0} pt={2} my={5}>Seus contatos</Titulo>
      <Contato navigation={navigation} nome={users.nome} conteudo={users.conteudo} timestamp={users.timestamp}/>
    </RoundedTop>
    <Box position="absolute" top="85%" right="5%">
      <BotaoNovoChat />
    </Box>
  </LinearGradientMoots>
  ) 
}