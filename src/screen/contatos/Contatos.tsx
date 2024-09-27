
import { Box, Text } from '@gluestack-ui/themed'
import { Titulo } from '../../components/Texto'

import Contato from '../../components/Contato'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import BotaoNovoChat from '../../components/BotaoNovoChat'
import { Pressable } from 'react-native'

export default function Contatos({navigation}) {
  return(
  <Box alignItems="center">
    <CabecalhoUsuario />
    <Titulo>Seus contatos</Titulo>
    <Contato nome="Gabriel" navigation={navigation} conteudo="teste" timestamp="11:20"/>
    <BotaoNovoChat />
  </Box>
  ) 
}