import { Box, Text } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/Post'
import AlertaRegular from '../../components/AlertaRetangular'

export default function Feed({navigation}) {

  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
      <Box alignItems="center" mt={35}>
        <Post />
      </Box>
      <AlertaRegular>
        Sua publicação foi enviada com sucesso.
      </AlertaRegular>
    </LinearGradientMoots>
  )
}