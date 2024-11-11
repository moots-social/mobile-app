import { Box, Divider, Image, ScrollView, Textarea, TextareaInput } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Post from "../../components/post/Post";
import { RoundedTop } from "../../components/geral/Rounded";
import Comentario from "../../components/post/Comentario";
import { useUsuarioContext } from "../../context/UsuarioContext";

const enviarIcon = require('../../assets/EnviarIconRounded.png')

import { usuarioIcon } from "../../components/perfil/PerfilComponents";
export default function PostExpandido({route}) {
  const {post} = route.params
  const {usuario} = useUsuarioContext()
  return (
    <LinearGradientMoots>
      <ScrollView>

      <CabecalhoPerfil
        titulo={`Publicação de ${post.tagUsuario}`}
        postExpandido={true}
        fontSize={18}
        userId={post.userId}
        />
      <Box alignSelf="center">
        <Post my={20} menu={false} botaoComentario={false} nomeUsuario={post.nomeUsuario} tagUsuario={post.tagUsuario} descricaoPost={post.descricaoPost} userId={post.userId} imagemPerfil={post.imagemPerfil} imagemPost={post.imagemPost}/>
      </Box>
      <RoundedTop
        bg="$white"
        minHeight={500}
        w="95%"
        alignSelf="center"
        display="flex"
        >
          <Box p={10} flexDirection="row">
            <Image source={usuario.fotoPerfil || usuarioIcon} rounded={30} w={20} h={20} mr={10} />
            <Textarea w="90%">
              <TextareaInput
                placeholder={`Diga algo para ${post.tagUsuario}...`}
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