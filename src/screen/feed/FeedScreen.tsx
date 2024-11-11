import { Box, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/post/Post'
import { BotaoNovoPost } from '../../components/botao/BotaoMais'
import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/geral/Loading'
import { postApi } from '../../api/apis'
import { getIdStorage, getTokenStorage } from '../../utils/storageUtils'
import { RefreshControl } from '@gluestack-ui/themed'
import { TextoNegrito } from '../../components/geral/Texto'
import { buscarTodosPosts } from '../../utils/postUtils'
import { useDispatch, useSelector } from 'react-redux'
import { setarUsuario } from '../../redux/useUsuario'
import { autenticar, desautenticar } from '../../redux/useAutenticacao'


export default function Feed({navigation}) {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [publics, setPublics] = useState<any>([])

  const auth = useSelector((state: any) => state.auth.autenticado)
  const user = useSelector((state: any) => state.usuario.user)

  
  useEffect(()=>{
    buscarTodosPosts().then((res)=>{
      if(res[0]){
        setPublics(res.reverse())
      } else throw new Error()
    }).catch((err)=>console.error(err)).finally(()=>setIsLoading(false))

    alert(auth)
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const novasPublics = await buscarTodosPosts();
      setPublics(novasPublics.reverse() || []);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  if(isLoading) return <Loading isOpen={isLoading}/>
  
  return (
    <LinearGradientMoots>
      <StatusBar translucent={false}/>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
        <Box alignItems="center" mt={35}>
          {publics && publics.length>0 ? publics.map((e: any, index: number) => (
            <Post 
              key={index}
              nomeUsuario={e.nomeCompleto}
              tagUsuario={e.tag} 
              mb={10} 
              imagemPerfil={e.fotoPerfil} 
              userId={e.userId}
              {...(e.texto && { descricaoPost: e.texto })}
              {...(e.listImagens && e.listImagens.length > 0 && { imagemPost: e.listImagens })}
            />
          )): <TextoNegrito fontSize={14}>Atualize a página para buscar mais publicações.</TextoNegrito>}
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
  )
}