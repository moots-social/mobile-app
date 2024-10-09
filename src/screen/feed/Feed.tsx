import { Box, Text } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'

export default function Feed({navigation}) {

  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
    </LinearGradientMoots>
  )
}