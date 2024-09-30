
import { Box, FlatList, ScrollView } from '@gluestack-ui/themed'
import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import BotaoNovoChat from '../../components/BotaoNovoChat'

const users = 
  {
    id: '1',
    nome: "Gabriel",
    conteudo: "Bom dia!",
    timestamp: "10:54"
  }


export default function Contatos({navigation}) {
  return(
  <Box alignItems="center" bg="$white" h="100%">
    <CabecalhoUsuario />
    <Titulo>Seus contatos</Titulo>
    <Box>
      <Contato navigation={navigation} nome={users.nome} conteudo={users.conteudo} timestamp={users.timestamp}/>
    </Box>
    <Box position="absolute" top="85%" right="5%">
      <BotaoNovoChat />
    </Box>
  </Box>
  ) 
}