
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'

export default function Contatos() {
  return <Box>
    <CabecalhoUsuario paginaContatos={false}/>
    <Text>Seus contatos</Text>
  </Box>
}