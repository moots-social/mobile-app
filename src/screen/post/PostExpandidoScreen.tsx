import { Box, Divider, Image, ScrollView, Textarea, TextareaInput } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import Post from "../../components/post/Post";
import { RoundedTop } from "../../components/geral/Rounded";
import Comentario from "../../components/post/Comentario";

const usuarioIcon = require('../../assets/UsuarioIcon.png')
const enviarIcon = require('../../assets/EnviarIconRounded.png')

export default function PostExpandido() {
  return (
    <LinearGradientMoots>
      <CabecalhoPerfil
        titulo="Publicação de @usuario"
        postExpandido={true}
        fontSize={18}
      />
      <Box alignSelf="center">
        <Post my={20} menu={false} />
      </Box>
      <RoundedTop
        bg="$white"
        h="100%"
        w="92%"
        alignSelf="center"
        display="flex"
      >
        <ScrollView>
          <Box p={10} flexDirection="row">
            <Image source={usuarioIcon} w={20} h={20} mr={10} />
            <Textarea w="90%">
              <TextareaInput
                placeholder={`Diga algo para @usuario...`}
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
        </ScrollView>
      </RoundedTop>
    </LinearGradientMoots>
  );
}