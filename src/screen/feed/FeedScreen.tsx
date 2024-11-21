import { Box, ScrollView, useToast } from '@gluestack-ui/themed';
import LinearGradientMoots from '../../components/geral/LinearGradientMoots';
import CabecalhoPerfil from '../../components/cabecalho/CabecalhoPerfil';
import { StatusBar } from 'expo-status-bar';
import Post from '../../components/post/Post';
import { BotaoNovoPost } from '../../components/botao/BotaoMais';
import { useCallback, useEffect, useState } from 'react';
import Loading from '../../components/geral/Loading';
import { apis, postApi } from '../../api/apis';
import { RefreshControl } from '@gluestack-ui/themed';
import { TextoNegrito } from '../../components/geral/Texto';
import { useSelector } from 'react-redux';
import searchUtils from '../../utils/searchUtils';
import { abrirToast } from '../../components/geral/ToastMoots';

export default function Feed({ navigation }) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [publics, setPublics] = useState<any>([]);
  const [deuLike, setDeuLike] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const toast = useToast()
  const id = useSelector(state => state.usuario.user.userId);
  const idString = String(id);

  useEffect(() => {
    const buscarPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await searchUtils.buscarTodosOsPosts();

        const postsComLike = posts.map(post => {
          const likeUsersAsStrings = post.likeUsers.map(userId => String(userId));
          const deuLike = likeUsersAsStrings.includes(idString);
          return { ...post, like: deuLike };
        });

        setPublics(postsComLike.reverse() || []);
      } catch (error: any) {
        alert(error.response?.message?.error || "Erro ao carregar os posts");
      } finally {
        setIsLoading(false);
      }
    };
    buscarPosts();
  }, [refresh, deuLike]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const posts = await searchUtils.buscarTodosOsPosts();

      const postsComLike = posts.map(post => {
        const likeUsersAsStrings = post.likeUsers.map(userId => String(userId));
        const deuLike = likeUsersAsStrings.includes(idString);
        return { ...post, like: deuLike };
      });

      setPublics(postsComLike.reverse() || []);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLikeChange = async (postId: string, deuLike: boolean) => {
    try {
      const likeStatus = deuLike ? false : true;

      const dados = await apis.post.curtirPost(postId, likeStatus);
      const req = await dados.data;

        // Atualiza apenas o post que foi curtir/descurtir
        setPublics(prevPublics =>
          prevPublics.map((post) =>
            post.id === postId
              ? { ...post, contadorLike: req.contadorLike, like: likeStatus }
              : post
          )
        );
      setDeuLike(!deuLike)
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  const handleSalvarPost = (postId: number) => {
    try{
      postApi.salvarPost(postId)
      abrirToast(toast, 'success', 'Post salvo com sucesso', '', 2000, true)

    } catch(error: any){
      alert(error.response.message.error || "erro ao salvar post")
    }
  }

  if (isLoading) return <Loading isOpen={isLoading} />;

  return (
    <>
      <StatusBar translucent />
      <LinearGradientMoots>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <CabecalhoPerfil titulo="Feed" temBotaoVoltar={false} />
          <Box alignItems="center" mt={35}>
            {publics && publics.length > 0 && publics[0] !== '' ? (
              publics.map((e: any) => (
                <Post
                  key={e.id}
                  nomeUsuario={e.nomeCompleto}
                  tagUsuario={e.tag}
                  mb={10}
                  imagemPerfil={e.fotoPerfil}
                  userId={e.userId}
                  contadorLike={e.contadorLike}
                  postId={e.postId}
                  deuLike={e.like}
                  curtirPost={handleLikeChange}
                  setRefresh={setRefresh}
                  salvarPost={handleSalvarPost}
                  {...(e.texto && { descricaoPost: e.texto })}
                  {...(e.listImagens && e.listImagens.length > 0 && { imagemPost: e.listImagens })}
                />
              ))
            ) : (
              <TextoNegrito fontSize={14}>Isso é tudo.</TextoNegrito>
            )}
          </Box>
        </ScrollView>
        <BotaoNovoPost position="absolute" $base-top="85%" $md-top="90%" $base-right="5%" $md-right="6%" />
      </LinearGradientMoots>
    </>
  );
}
