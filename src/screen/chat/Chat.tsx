
import { useRoute } from '@react-navigation/native'
import { Box, Text } from '@gluestack-ui/themed'
import CabecalhoUsuario from '../../components/CabecalhoUsuario'

export default function Chat({navigation}) {
  const {id} = useRoute().params
  return (
    <Box>
      <CabecalhoUsuario paginaContatos={false} navigation={navigation}/>
      <Text>{id}</Text>
    </Box>
  )
}