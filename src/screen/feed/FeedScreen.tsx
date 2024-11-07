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


export default function Feed({navigation}) {
  const [isLoading, setIsLoading] = useState(true)
  const [publics, setPublics] = useState<any>([])
  const token = getTokenStorage();
  const id = getIdStorage();


  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
      
      reqPosts()
    }, 150)

    const reqPosts = async() => {
      try{
        const req = await postApi.get("/find-all", {
        headers: {
          Authorization: await token
          }
        })
        
        const data = await req.data;
  
        if (data){
          console.log(data)
          setPublics([...publics, data]);
        }
      }catch(error: any){
        console.log(error.response.data.error)
      }
    }
    reqPosts();
    
  }, [])

  return (
    <LinearGradientMoots>
      <Loading isOpen={isLoading}/>
      <StatusBar translucent={false}/>
      <ScrollView h="100%">
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
        <Box alignItems="center" mt={35}>
          {publics.map((e) => (
            <Post descricaoPost={e.texto} nomeUsuario={e.nomeCompleto}tagUsuario={e.tag} mb={10} imagemPerfil={e.fotoPerfil} userId={1}/>
          ))}
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}
