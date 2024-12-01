import { Box, Divider, Image, Pressable, ScrollView, Textarea, TextareaInput, useToast } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Post from "../../components/post/Post";
import { RoundedTop } from "../../components/geral/Rounded";
import Comentario from "../../components/post/Comentario";

import { usuarioIcon } from "../../components/perfil/PerfilComponents";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import postUtils, { salvarPost } from "../../utils/postUtils";
import Loading, { BareLoading } from "../../components/geral/Loading";
import { abrirToast } from "../../components/geral/ToastMoots";
import { comentarioApi } from "../../api/apis";
import { TextoNegrito } from "../../components/geral/Texto";
import { BotaoEnviarNovoPost } from "../../components/botao/BotoesPostComentario";
import { LazyIcon } from "../../components/geral/LazyImage";

export default function PostExpandido({route, navigation}) {
  const [enviandoComentario, setEnviandoComentario] = useState<boolean>(false)
  const [post, setPost] = useState<any>(route.params.post || null)
  const postId = route.params.postId || null
  const toast = useToast()
  const usuario = useSelector((state)=> state.usuario.user)
  const comentarioRef = useRef(null)
  const veioDeComentario = route.params.veioDeComentario || false
  const [comentario, setComentario] = useState<string>("")
  const [comentou, setComentou] = useState<boolean>(true)

  const handleBuscarPostPorId = async()=>{
      const resultado = await postUtils.buscarPostPorId(postId || post.postId)
      if(resultado!==0){
        setPost(resultado)
      } else {
        navigation.navigate('tabs')
        abrirToast(toast, 'error', 'Não foi possível abrir a publicação.\nTalvez ela tenha sido excluída.', '', 2000, false)
      }
  }

  const handleSalvarPost = (postId: number) => {
    try{
      salvarPost(postId)
      abrirToast(toast, 'success', 'Post salvo com sucesso.', '', 2000, true)

    } catch(error: any){
      abrirToast(toast, 'error', 'Tente novamente mais tarde.', 'Erro')
    }
  }

  const handleNovoComentario = async () => {
    if(comentario!==''){
      try {
        setEnviandoComentario(true)
        const resposta = await comentarioApi.novoComentario(post.postId, comentario);
        if (resposta) {
          setComentario("");
          abrirToast(toast, "success", "Comentário enviado com sucesso.", "", 1000, false);
          
          const postAtualizado = await postUtils.buscarPostPorId(post.postId || postId);
          if (postAtualizado !== 0) {
            setPost(postAtualizado);
          }
        }
      } catch (error) {
        console.error(error);
        abrirToast(toast, 'error', 'Não foi possível enviar o comentário.\nTalvez essa publicação tenha sido excluída.', '', 2000, false)
      } finally {
        setEnviandoComentario(false)
      }
    } else{
      abrirToast(toast, 'error', 'Digite algo para enviar um comentário.')
    }
  };  
  
    useEffect(()=>{
      handleBuscarPostPorId()
    }, [comentou, route.params])
    
  if(post==null) return <Loading isOpen={true}/>
  else return (
    <LinearGradientMoots>
      <ScrollView>

      <CabecalhoPerfil
        titulo={`Publicação de ${post.tagUsuario || post.tag}`}
        postExpandido={true}
        fontSize={18}
        userId={post.userId}
        postId={post.postId || post.id}
        />
      <Box alignSelf="center">
        <Post my={20} $base-w='100%' $md-w='109%' 
        likeUsers={post.likeUsers} 
        postId={post.postId || postId} 
        menu={false} 
        botaoComentario={false} 
        nomeUsuario={post.nomeUsuario || post.nomeCompleto} 
        tagUsuario={post.tagUsuario || post.tag} 
        descricaoPost={post.descricaoPost || post.texto} 
        userId={post.userId} 
        imagemPerfil={post.imagemPerfil || post.fotoPerfil} 
        imagemPost={post.imagemPost || post.listImagens} 
        contadorLike={post.contadorLike} 
        salvarPost={handleSalvarPost}/>
      </Box>
      <RoundedTop
        bg="$white"
        $base-minHeight={700}
        $md-minHeight={1100}
        w="95%"
        alignSelf="center"
        display="flex"
        >
          <Box p={10} flexDirection="row">
            <LazyIcon imagem={usuario.fotoPerfil || usuarioIcon} style={{borderRadius: 30, width: 20, height: 20, marginRight: 10}}/>
            <Textarea w="90%">
              <TextareaInput
                autoFocus={veioDeComentario}
                placeholder={`Diga algo para ${post.tagUsuario || post.tag}...`}
                fontFamily="Poppins_500Medium"
                fontSize={12}
                value={comentario}
                onChangeText={(text) => setComentario(text)}
                ref={comentarioRef}
                />
                {/* <BotaoEnviarNovoPost alignSelf="flex-end" m={5} onPress={() => handleNovoComentario()}/> */}
                {!enviandoComentario ? <BotaoEnviarNovoPost alignSelf="flex-end" m={5} onPress={() => handleNovoComentario()}/> : <BareLoading m={5} alignSelf='flex-end'/>}
            </Textarea>
          </Box>
          <Divider w="92%" alignSelf="center" h={2} />
          <Box>
          {post.comentarioList?.length > 0 && post.comentarioList[0] !== "" ? (
            post.comentarioList.map(post => (
            <Comentario
              key={post.id} // Sempre inclua uma chave única para cada comentário
              tag={post.tag}
              conteudo={post.texto}
              mt={10}
              fotoPerfil={post.fotoPerfil}
              comentarioId={post.id}
              postId={postId || post.postId}
              userId={post.userId}
              onComentarioExcluido={handleBuscarPostPorId}
            />
          ))
        ) : (
          <TextoNegrito alignSelf='center' mt='$2'>Seja o primeiro a comentar algo!</TextoNegrito>
        )}
          </Box>
      </RoundedTop>
                </ScrollView>
    </LinearGradientMoots>
  );
}