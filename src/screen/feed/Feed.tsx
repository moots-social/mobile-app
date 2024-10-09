import { Box, Text } from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import BotaoNovoChat from '../../components/BotaoNovoChat'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'

export default function Feed({navigation}) {

  return (
    <LinearGradientMoots>
      <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
    </LinearGradientMoots>
  )
}