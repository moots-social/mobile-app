
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import Contato from '../../components/Contato'
import { Titulo } from '../../components/Texto'

export default function Contatos() {
  return <Box alignItems="center">
    <Titulo>Seus contatos</Titulo>
    <Contato nome="Gabriel" conteudo="jsjahd" timestamp="11:20"/>
  </Box>
}