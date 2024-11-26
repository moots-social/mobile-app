import { Box, Divider, Image, Pressable, ScrollView, Textarea, TextareaInput, useToast } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Post from "../../components/post/Post";
import { RoundedTop } from "../../components/geral/Rounded";
import Comentario from "../../components/post/Comentario";

const enviarIcon = require('../../assets/EnviarIconRounded.png')

import { usuarioIcon } from "../../components/perfil/PerfilComponents";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import postUtils from "../../utils/postUtils";
import Loading from "../../components/geral/Loading";
import { abrirToast } from "../../components/geral/ToastMoots";
import { apis, comentarioApi, postApi } from "../../api/apis";
import { TextoNegrito } from "../../components/geral/Texto";

export default function PostExpandido({route, navigation}) {
  const [post, setPost] = useState<any>(route.params.post || null)
  const postId = route.params.postId || null
  const [deuLike, setDeuLike] = useState<boolean>(true);
  const toast = useToast()
  const usuario = useSelector((state)=> state.usuario.user)
  const comentarioRef = useRef(null)
  const veioDeComentario = route.params.veioDeComentario || false
  const [comentario, setComentario] = useState<string>("")
  const [comentou, setComentou] = useState<boolean>(true)

  const handleBuscarPostPorId = async()=>{
      const resultado = await postUtils.buscarPostPorId(postId || post.postId)
      console.log(resultado)
      if(resultado!==0){
        console.log(resultado)
        setPost(resultado)
      } else {
        navigation.navigate('tabs')
        abrirToast(toast, 'error', 'Não foi possível abrir a publicação. Talvez ela tenha sido excluída.')
      }
  }

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

  const handleNovoComentario = async () => {
    if(comentario!==''){
      try {
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
        alert(error);
      }
    } else{
      abrirToast(toast, 'error', 'Digite algo para enviar um comentário.')
    }
  };  
  
    useEffect(()=>{
      handleBuscarPostPorId()
    }, [comentou, route.params])
    console.log(post)
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
            <Image source={usuario.fotoPerfil || usuarioIcon} rounded={30} w={20} h={20} mr={10} />
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
              <Pressable onPress={() => handleNovoComentario()}>
                <Image
                  source={enviarIcon}
                  w={20}
                  h={20}
                  m={5}
                  alignSelf="flex-end"
                  />
              </Pressable>
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