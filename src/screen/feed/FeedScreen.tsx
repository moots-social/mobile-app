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
          <Post descricaoPost='ola' nomeUsuario="teste" tagUsuario='olá' imagemPost='https://media.gettyimages.com/id/1668971338/pt/foto/belem-brazil-neymar-jr-of-brazil-celebrates-after-scoring-the-fifth-goal-of-his-team-during-a.jpg?s=612x612&w=gi&k=20&c=fTYuoteShqXBDE1yp0ByGaczwd2KbpcpQRxd4OninZ4=' mb={10} imagemPerfil='https://storageimagesmoots.blob.core.windows.net/artifact-image-container/68a77764-1c2e-4bc4-8d6b-c280ac593970.png'/>
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}
