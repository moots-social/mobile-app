
import { Box, Text } from '@gluestack-ui/themed'
import Contato from '../../components/Contato'

export default function Contatos() {
  return <Box alignItems="center">
    <Text>Seus contatos</Text>
    <Contato nome="Gabriel" conteudo="teste" timestamp="11:20"/>
  </Box>
}