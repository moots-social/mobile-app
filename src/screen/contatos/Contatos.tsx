
import { Box, ScrollView } from '@gluestack-ui/themed'
import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import BotaoNovoChat from '../../components/BotaoNovoChat'
import { Pressable } from 'react-native'

export default function Contatos({navigation}) {
  return(
  <Box alignItems="center" bg="$white" h="100%">
    <CabecalhoUsuario />
    <Titulo>Seus contatos</Titulo>
    <Box>
      <Contato nome="Gabriel Medeiros" navigation={navigation} conteudo="teste" timestamp="11:20"/>
      <Contato nome="Julia Almeida" navigation={navigation} conteudo="oiiiii" timestamp="10:02"/>
      <Contato nome="Julia Almeida" navigation={navigation} conteudo="oiiiii" timestamp="10:02"/>
    </Box>
    <Box position="absolute" top="85%" right="5%">
      <BotaoNovoChat />
    </Box>
  </Box>
  ) 
}