import { Box, Image, Pressable, ScrollView, Text, useToast } from "@gluestack-ui/themed";
import { FullRounded } from "../geral/Rounded";
import { TextoNegrito } from "../geral/Texto";
import { BotaoComentar, BotaoCurtirPost, BotaoSalvar } from "../botao/BotoesPostComentario";
import { useNavigation } from "@react-navigation/native";
import { MenuPost } from "./PostMenu";
import { useEffect, useState } from "react";
import ImageView from "react-native-image-viewing";
import { usuarioIcon } from "../perfil/PerfilComponents";
import { DimensionValue } from "react-native";
import postUtils from "../../utils/postUtils";
import { useDispatch, useSelector } from "react-redux";
import { abrirToast } from "../geral/ToastMoots";
import { buscarColecao } from "../../utils/usuarioUtils";
import { setarUsuario } from "../../redux/useUsuario";


interface IPostProps {
  postId: number;
  nomeUsuario: string;
  tagUsuario: string;
  descricaoPost: string;
  imagemPost?: string[];
  imagemPerfil?: string;
  userId?: any;
  menu?: boolean;
  botaoComentario?: boolean;
  expandivel?: boolean;
  rw?: DimensionValue;
  contadorLike?: number;
  curtirPost?: (postId: number, deuLike: boolean) => void;
  deuLike?: boolean
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  salvarPost?: (postId: number) => void,
  likeUsers: string[]
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
  likeUsers,
  ...rest
}: IPostProps) {
  
  const navigation = useNavigation();
  const toast = useToast()
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const postObject = { nomeUsuario, tagUsuario, descricaoPost, userId, imagemPost, imagemPerfil, contadorLike, postId, likeUsers };
  const usuario = useSelector(state=> state.usuario.user)
  const dispatch = useDispatch()
  // const [curtiu, setCurtiu] = useState<boolean>(likeUsers.includes(String(usuario.id)))
  const [curtiu, setCurtiu] = useState<boolean>()
  const [salvou, setSalvou] = useState<boolean>()
  const imagensFormatadas = imagemPost ? [{ uri: imagemPost[0] }, { uri: imagemPost[1] }, { uri: imagemPost[2] }, { uri: imagemPost[3] }] : [{}];

  const handleExpandirFoto = (index: number) => {
    setIndex(index);
    setIsVisible(true); 
  };

  const handleCurtirPost = async()=>{
    if(curtiu){
      const res = await postUtils.curtirPost(postId, false)
      if(res!=0){
        setCurtiu(false)
        alert('PARABÉNS VC desCURTIU A PORRA DO COMENTARIO')
      } 
      else abrirToast(toast, 'error', 'Algo deu errado. Tente novamente mais tarde.')
    } else{
      const res = await postUtils.curtirPost(postId, true)
      if(res!=0) {
        setCurtiu(true)
        alert('PARABÉNS VC CURTIU A PORRA DO COMENTARIO')

      } 
      else abrirToast(toast, 'error', 'Algo deu errado. Tente novamente mais tarde.')
    }
  }

  const handleSalvarPost = async()=>{
    if (salvou) {
      const res = await postUtils.removerPostSalvo(postId)
      if(res==200){
        setSalvou(false)
        abrirToast(toast, 'success', 'Publicação removida da coleção com sucesso.', '', 1000, false)
        
      }
    }else{
      const res = await postUtils.salvarPost(postId)
      if(res==200){
        setSalvou(true)
        abrirToast(toast, 'success', 'Publicação salva com sucesso.', '', 1000, false)
      }
    }
    const listaDeSalvosAtualizada = await buscarColecao()
    console.log(listaDeSalvosAtualizada)
    dispatch(setarUsuario({...usuario, colecaoSalvos: listaDeSalvosAtualizada}))
  }
      const handleClickComentario = () =>{
        navigation.navigate('expandido', {post: postObject, veioDeComentario: true})
      }
      
      const handleIrProPerfil = () =>{
        navigation.navigate('outro-perfil', {userId})
      }

      useEffect(()=>{
        const handleIsSalvo = async() =>{
          const checkIsSalvo = await usuario.colecaoSalvos.some(dado => dado.postId == postId)
          setSalvou(checkIsSalvo)
        }
        handleIsSalvo()
      }, [usuario.colecaoSalvos])

  return (
    <>
    <Pressable onPress={()=> navigation.navigate('expandido', {postId: postId})} {...rest}>
        <FullRounded bg="$white" w={rw ? rw : menu ? "90%" : "100%"} py={20} px={10} pr={20} {...rest}>
        <Box flexDirection="row" w="100%">
            <Pressable onPress={handleIrProPerfil} >
            <Image source={imagemPerfil || usuarioIcon} w={40} h={40} alt="foto do usuário" size={50} borderRadius={50} />
            
            </Pressable >
            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                <Box>
                    <TextoNegrito onPress={handleIrProPerfil} >{nomeUsuario}</TextoNegrito>
                    <Text onPress={handleIrProPerfil} fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>{tagUsuario}</Text>
                </Box>
                {descricaoPost && <Text fontFamily="Poppins_500Medium" fontSize={14}>{descricaoPost}</Text> }
                <ScrollView flexDirection="row" horizontal showsHorizontalScrollIndicator={false} mt={10}>
                    {imagemPost && imagemPost.map((imagem, index) =>  (imagem && (<Pressable onPress={()=>handleExpandirFoto(index)}>
                                                        {/* <Image source={imagem} mr={10} rounded={10} h={200} w={200} /> */}
                                                    </Pressable>))
                                )}
                </ScrollView>

            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">

            <Box flexDirection="row" display="flex" mt={10}>
                <Box flexDirection="row" w="95%" gap={10}>
                <BotaoCurtirPost size="2xs" onPress={handleCurtirPost} curtiu={curtiu}/>
                <BotaoSalvar size="2xs" onPress={handleSalvarPost} salvou={salvou}/>
                </Box>
                {botaoComentario && <BotaoComentar justifyContent="flex-end" size="2xs" onPress={handleClickComentario}/>}
            </Box>
            </Box>

        </Box>
            {menu && <MenuPost userId={userId} postId={postId} tagUsuario={tagUsuario}/>}
        </Box>
        </FullRounded>
    </Pressable>
        <ImageView
          images={imagensFormatadas}
          imageIndex={index}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
  </>
    
  );
}
