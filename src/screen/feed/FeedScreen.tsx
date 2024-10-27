import { Box, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/post/Post'
import { BotaoNovoPost } from '../../components/botao/BotaoMais'
import { useEffect, useState } from 'react'
import Loading from '../../components/geral/Loading'


export default function Feed({navigation}) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 150)
  }, [])
  return (
    <LinearGradientMoots>
      <Loading isOpen={isLoading}/>
      <StatusBar translucent={false}/>
      <ScrollView h="100%">
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
        <Box alignItems="center" mt={35}>
          <Post conteudoUsuario='' mb={10}/>
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}
