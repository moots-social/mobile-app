
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import Contato from '../../components/Contato'
import Navbar from '../../components/Navbar'

export default function Contatos() {
  return <Box alignItems="center">
    <Text>Seus contatos</Text>
    <Contato nome="Gabriel" conteudo="teste" timestamp="11:20"/>
  </Box>
}