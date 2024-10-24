import { Box, Pressable, ScrollView, Text} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/Post'
import { BotaoNovoPost } from '../../components/BotaoMais'


export default function Feed({navigation}) {
  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <ScrollView h="100%">
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} />
        <Box alignItems="center" mt={35}>
          <Post conteudoUsuario='' mb={10}/>
          <Pressable onPress={()=>navigation.navigate('perfil', {id: 1})} >
            <Text>oi</Text>
          </Pressable>
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}
