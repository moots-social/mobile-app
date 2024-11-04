import { Box, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/post/Post'
import { BotaoNovoPost } from '../../components/botao/BotaoMais'
import { useEffect, useState } from 'react'
import Loading from '../../components/geral/Loading'
import { postApi } from '../../api/apis'
import { getIdStorage, getTokenStorage } from '../../utils/storageUtils'
import { Alert } from 'react-native'


export default async function Feed({navigation}) {
  const token = await getTokenStorage()
  const id = await getIdStorage()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState([]);

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 150)

    const reqPosts = async() => {
      try{
        const req = await postApi.get("/find-all", {
        headers: {
          Authorization: token
          }
        })
        const data = await req.data;

        if (data){
          console.log(data)
        }
      }catch(error: any){
        console.log(error.response.data.error)
      }
    }

    reqPosts()
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
