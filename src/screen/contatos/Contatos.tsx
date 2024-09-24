
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'
import Contato from '../../components/Contato'

export default function Contatos() {
  return <Box alignItems="center">
    <Text>Seus contatos</Text>
    <Contato />
  </Box>
}