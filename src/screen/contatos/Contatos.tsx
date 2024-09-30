
import { Box, FlatList, ScrollView } from '@gluestack-ui/themed'
import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import BotaoNovoChat from '../../components/BotaoNovoChat'

const users = [
  {
    id: '1',
    nome: "Gabriel",
    conteudo: "Bom dia!",
    timestamp: "10:54"
  },
  {
    id: '2',
    nome: "Gabriel",
    conteudo: "Bom dia!",
    timestamp: "10:54"
  },
  
]

export default function Contatos({navigation}) {
  return(
  <Box alignItems="center" bg="$white" h="100%">
    <CabecalhoUsuario />
    <Titulo>Seus contatos</Titulo>
    <Box>
      <FlatList data={users}
                renderItem={({item})=> <Contato navigation={navigation} nome={item.nome} conteudo={item.conteudo} timestamp={item.timestamp}/>}/>
    </Box>
    <Box position="absolute" top="85%" right="5%">
      <BotaoNovoChat />
    </Box>
  </Box>
  ) 
}