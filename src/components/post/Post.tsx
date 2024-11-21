import { Box, Menu, MenuItem, MenuItemLabel,Image, Pressable, ScrollView, Text } from "@gluestack-ui/themed";
import { FullRounded } from "../geral/Rounded";
import { TextoNegrito } from "../geral/Texto";
import { BotaoComentar, BotaoCurtirPost, BotaoDescurtirPost, BotaoSalvar } from "../botao/BotoesPostComentario";
import { useNavigation } from "@react-navigation/native";
import { MenuPost } from "./PostMenu";
import { useState } from "react";
import ImageView from "react-native-image-viewing";
import { usuarioIcon } from "../perfil/PerfilComponents";
import { StatusBar } from "expo-status-bar";
import { DimensionValue } from "react-native";
import FastImage from "react-native-fast-image";

const menuIcon = require('../../assets/MenuIcon.png')

interface IPostProps {
  descricaoPost: string;
  imagemPost?: string[];
  imagemPerfil?: string;
  userId?: any;
  menu?: boolean;
  botaoComentario?: boolean;
  expandivel?: boolean;
  nomeUsuario: string;
  tagUsuario: string;
  rw?: DimensionValue;
  contadorLike?: number;
  curtirPost?: (postId: number, deuLike: boolean) => void;
  postId: number;
  deuLike?: boolean
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  salvarPost?: (postId: number) => void
}

export default function Post({
  descricaoPost,
  imagemPost,
  imagemPerfil,
  userId,
  menu = true,
  botaoComentario = true,
  nomeUsuario,
  tagUsuario,
  rw,
  contadorLike,
  curtirPost,
  postId,
  deuLike,
  setRefresh,
  salvarPost,
  ...rest
}: IPostProps) {
  
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const postObject = { nomeUsuario, tagUsuario, descricaoPost, userId, imagemPost, imagemPerfil, contadorLike, postId };
  const [excluiuPost, setExcluiuPost] = useState<boolean>(false);

  const imagensFormatadas = imagemPost ? [{ uri: imagemPost[0] }, { uri: imagemPost[1] }, { uri: imagemPost[2] }, { uri: imagemPost[3] }] : [{}];

  const handleExpandirFoto = (index: number) => {
    setIndex(index);
    setIsVisible(true); 
  };

  const handleCurtir = () => {
    curtirPost(postId, deuLike);
  };

  const handleSalvar = () => {
    salvarPost(postId)
  }

  if (isVisible) {
    return (
      <>
        <StatusBar hidden />
        <ImageView
          images={imagensFormatadas}
          imageIndex={index}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
      </>
    );
  }

  return (
    <Pressable onPress={()=> navigation.navigate('expandido', {post: postObject})} {...rest}>
        <FullRounded bg="$white" w={rw ? rw : menu ? "90%" : "100%"} py={20} px={10} pr={20} {...rest}>
        <Box flexDirection="row" w="100%">
            <Box>
            <Image source={imagemPerfil || usuarioIcon} w={40} h={40} alt="foto do usuário" size={50} borderRadius={50} />
            </Box>
            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                <Box>
                    <TextoNegrito>{nomeUsuario}</TextoNegrito>
                    <Text fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>{tagUsuario}</Text>
                </Box>
                {descricaoPost && <Text fontFamily="Poppins_500Medium" fontSize={14}>{descricaoPost}</Text> }
                <ScrollView flexDirection="row" horizontal showsHorizontalScrollIndicator={false} mt={10}>
                    {imagemPost && imagemPost.map((imagem, index) =>  (imagem && (<Pressable onPress={()=>handleExpandirFoto(index)}>
                                                        <Image source={imagem} mr={10} rounded={10} h={200} w={200} />
                                                    </Pressable>))
                                )}
                </ScrollView>

            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">

            <Box flexDirection="row" display="flex" mt={10}>
                <Box flexDirection="row" w="95%" gap={10}>
                <BotaoCurtirPost size="2xs" onPress={() => handleCurtir()} />
                <Text>{contadorLike || 0}</Text>
                <BotaoSalvar size="2xs" onPress={() => handleSalvar()}/>
                </Box>
                {botaoComentario && <BotaoComentar justifyContent="flex-end" size="2xs" />}
            </Box>
            </Box>

        </Box>
            {/* Menu e ações do post */}
            {menu && <MenuPost userId={userId} postId={postId} setRefresh={setRefresh} />}
        </Box>
        </FullRounded>
    </Pressable>
  );
}
