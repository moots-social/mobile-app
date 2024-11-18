import { Box, ScrollView} from '@gluestack-ui/themed'
import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil'
import { StatusBar } from 'expo-status-bar'
import Post from '../../components/post/Post'
import { BotaoNovoPost } from '../../components/botao/BotaoMais'
import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/geral/Loading'
import { apis, postApi } from '../../api/apis'
import { getIdStorage, getTokenStorage } from '../../utils/storageUtils'
import { RefreshControl } from '@gluestack-ui/themed'
import { TextoNegrito } from '../../components/geral/Texto'
import { useDispatch, useSelector } from 'react-redux'
import { setarUsuario } from '../../redux/useUsuario'
import { autenticar, desautenticar } from '../../redux/useAutenticacao'
import searchUtils from '../../utils/searchUtils'
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function Feed({navigation}) {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [publics, setPublics] = useState<any>([])
  const [deuLike, setDeuLike] = useState<boolean>(true)
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(()=>{
    const id = AsyncStorage.getItem('id')
    setIsLoading(true)
    const buscarPosts = async()=>{
      const resultado = await searchUtils.buscarTodosOsPosts()
      if(resultado){
        const postsComLike = resultado.map(post => {
          const deuLike = post.content.likeUsers.include(id)
          return { ...post, deuLike };
        })
        setPublics(postsComLike.reverse() || [''])
      }
      // setPublics([])
      
    }
    buscarPosts()
    setIsLoading(false)

  }, [refresh])

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

  const handleLikeChange = async (postId: number, deuLike: boolean) => {
    // try {
    //   setPublics((prevPosts) =>
    //     prevPosts.map((post) =>
    //       post.postId === postId
    //         ? { ...post, contadorLike: post.contadorLike + (like ? 1 : -1) }
    //         : post
    //     )
    //   );
  
    //   const req = await apis.post.curtirPost(postId, like);
    //   const resultado = await req.data;
  
    //   if (resultado) {
    //     setDeuLike(!deuLike);
    //   } else {
    //     setPublics((prevPosts) =>
    //       prevPosts.map((post) =>
    //         post.postId === postId
    //           ? { ...post, contadorLike: post.contadorLike - (like ? 1 : -1) }
    //           : post
    //       )
    //     );
    //   }
    // } catch (error) {
    //   console.error("Erro ao curtir o post:", error);
    //   setPublics((prevPosts) =>
    //     prevPosts.map((post) =>
    //       post.postId === postId
    //         ? { ...post, contadorLike: post.contadorLike - (like ? 1 : -1) }
    //         : post
    //     )
    //   );
    // }
    try{
       // Alterna o estado de like
       const likeStatus = deuLike ? false : true; // Se já deu like, vamos remover o like, caso contrário vamos dar o like
       const dados = await apis.post.curtirPost(postId, likeStatus)
       const req = await dados.data;

       if(req){
        setPublics((prevPublics) => 
          prevPublics.map((post) => 
            post.id === postId
              ? {...post, contadorLike: req.contadorLike, deuLike: likeStatus}
              : post
            ) 
        );
       }
    } catch (error: any) {
      console.log(error.response.data.error)
    }
  };
  
  
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
              contadorLike={e.contadorLike}
              postId={e.postId} 
              deuLike={e.deuLike}
              curtirPost={handleLikeChange}
              setRefresh={setRefresh}
              {...(e.texto && { descricaoPost: e.texto })}
              {...(e.listImagens && e.listImagens.length > 0 && { imagemPost: e.listImagens })}
            />
          )): <TextoNegrito fontSize={14}>Isso é tudo.</TextoNegrito>}
          {/* {publics.length>0 && publics[0]!=='' ? <VirtualizedPosts dataPost={publics}/> : <TextoNegrito fontSize={14}>Isso é tudo.</TextoNegrito>} */}
        </Box>
      </ScrollView>
        <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" />
    </LinearGradientMoots>
    </>
  )
}