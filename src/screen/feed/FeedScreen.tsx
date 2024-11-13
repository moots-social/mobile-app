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
import { useDispatch, useSelector } from 'react-redux'
import { setarUsuario } from '../../redux/useUsuario'
import { autenticar, desautenticar } from '../../redux/useAutenticacao'
import searchUtils from '../../utils/searchUtils'


export default function Feed({navigation}) {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [publics, setPublics] = useState<any>([])

  
  useEffect(()=>{
    setIsLoading(true)
    const buscarPosts = async()=>{
      const resultado = await searchUtils.buscarTodosOsPosts()
      setPublics(resultado.content.reverse() || [''])
      // setPublics([])

    }
    buscarPosts()
    setIsLoading(false)

  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const novasPublics = await searchUtils.buscarTodosOsPosts();
      setPublics(novasPublics.content.reverse() || []);
      // setPublics([])
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  if(isLoading) return <Loading isOpen={isLoading}/>
  
  return (
    <>
      <StatusBar translucent/>
    <LinearGradientMoots>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
        <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false}/>
        <Box alignItems="center" mt={35}>
          {publics && publics.length>0 && publics[0]!=='' ? publics.map((e: any, index: number) => (
            <Post 
              key={e.id}
              nomeUsuario={e.nomeCompleto}
              tagUsuario={e.tag} 
              mb={10} 
              imagemPerfil={e.fotoPerfil} 
              userId={e.userId}
              {...(e.texto && { descricaoPost: e.texto })}
              {...(e.listImagens && e.listImagens.length > 0 && { imagemPost: e.listImagens })}
            />
          )): <TextoNegrito fontSize={14}>Isso é tudo.</TextoNegrito>}
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" top="85%" right="5%" />
    </LinearGradientMoots>
    </>
  )
}