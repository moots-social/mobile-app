import { Box, Divider, Image, ScrollView, Textarea, TextareaInput } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Post from "../../components/post/Post";
import { RoundedTop } from "../../components/geral/Rounded";
import Comentario from "../../components/post/Comentario";

const enviarIcon = require('../../assets/EnviarIconRounded.png')

import { usuarioIcon } from "../../components/perfil/PerfilComponents";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import postUtils from "../../utils/postUtils";
import Loading from "../../components/geral/Loading";
export default function PostExpandido({route}) {
  const postId = route.params.postId || null
  const [post, setPost] = useState<any>(route.params.post || null)
  const usuario = useSelector((state)=> state.usuario.user)

    const handleBuscarPostPorId = async()=>{
      if(!post){
        const resultado = await postUtils.buscarPostPorId(postId)
        if(resultado!==0){
          setPost(resultado)
        }
      }
    }
    useEffect(()=>{
      handleBuscarPostPorId()
    }, [route.params])
  if(post==null) return <Loading isOpen={true}/>
  else return (
    <LinearGradientMoots>
      <ScrollView>

      <CabecalhoPerfil
        titulo={`Publicação de ${post.tagUsuario || post.tag}`}
        postExpandido={true}
        fontSize={18}
        userId={post.userId}
        />
      <Box alignSelf="center">
        <Post my={20} $base-w='100%' $md-w='109%' menu={false} botaoComentario={false} nomeUsuario={post.nomeUsuario || post.nomeCompleto} tagUsuario={post.tagUsuario || post.tag} descricaoPost={post.descricaoPost || post.texto} userId={post.userId} imagemPerfil={post.imagemPerfil || post.fotoPerfil} imagemPost={post.imagemPost || post.listImagens}/>
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
                placeholder={`Diga algo para ${post.tagUsuario || post.tag}...`}
                fontFamily="Poppins_500Medium"
                fontSize={12}
                />
              <Image
                source={enviarIcon}
                w={20}
                h={20}
                m={5}
                alignSelf="flex-end"
                />
            </Textarea>
          </Box>
          <Divider w="92%" alignSelf="center" h={2} />
          <Box>
            <Comentario tag="usuario1" conteudo="Testre" mt={10} />
            <Comentario tag="usuario1" conteudo="Testre" mt={0} />
            <Comentario tag="usuario1" conteudo="Testre" mt={0} />
          </Box>
      </RoundedTop>
                </ScrollView>
    </LinearGradientMoots>
  );
}