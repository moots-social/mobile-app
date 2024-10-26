import { Box, Pressable, ScrollView, Text} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/LinearGradientMoots'
import CabecalhoPerfil from '../../components/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/Post'
import { BotaoNovoPost } from '../../components/BotaoMais'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'


export default function Feed() {
  const token = AsyncStorage.getItem('token')
  const email = AsyncStorage.getItem('email');
  console.log(token)
  console.log(email)
  
  // useEffect(() => {
  //   AsyncStorage.setItem('autentication', String(false))
  // }, [])

  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <ScrollView h="100%">
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} />
        <Box alignItems="center" mt={35}>
          <Post conteudoUsuario='' mb={10}/>
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}
