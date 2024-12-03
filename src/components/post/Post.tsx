import { Box, Pressable, ScrollView, Text, useToast } from "@gluestack-ui/themed";
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
import { buscarColecao, buscarPostsCurtidos } from "../../utils/usuarioUtils";
import { setarUsuario } from "../../redux/useUsuario";
import {LazyImage} from "../geral/LazyImage";
import { StatusBar } from "expo-status-bar";
import { BareLoading } from "../geral/Loading";

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
  descricaoPost='',
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
  const [curtiu, setCurtiu] = useState<boolean>(false)
  const [salvou, setSalvou] = useState<boolean>(false)
  const [clicouCurtiu, setClicouCurtiu] = useState<boolean>()
  const [clicouSalvou, setClicouSalvou] = useState<boolean>()
  const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState<boolean>(false)
  const imagensFormatadas = imagemPost ? [{ uri: imagemPost[0] }, { uri: imagemPost[1] }, { uri: imagemPost[2] }, { uri: imagemPost[3] }] : [{}];

  const textoResumido = descricaoPost?.length > 0
  ? mostrarTextoCompleto ? descricaoPost : descricaoPost.substring(0, 100)
  : ""
  const handleExpandirFoto = (index: number) => {
    setIndex(index);
    setIsVisible(true); 
  };

  const handleCurtirPost = async()=>{
    setClicouCurtiu(true)
    if(curtiu){
      const res = await postUtils.curtirPost(postId, false)
      if(res==0){
        abrirToast(toast, 'error', 'Algo deu errado. Tente novamente mais tarde.')
        setClicouCurtiu(false)
        return
      }
      setCurtiu((prevCurtiu) => !prevCurtiu)
    } else{
      const res = await postUtils.curtirPost(postId, true)
      if(res==0) {
        abrirToast(toast, 'error', 'Algo deu errado. Tente novamente mais tarde.')
        setClicouCurtiu(false)
        return
      }
      setCurtiu((prevCurtiu) => !prevCurtiu)
      abrirToast(toast, 'success', `Você curtiu a publicação de ${tagUsuario}.`, '', 1000, false)
    }
    const listaCurtidasAtualizadas = await buscarPostsCurtidos()
    dispatch(setarUsuario({...usuario, idPostsCurtidos: listaCurtidasAtualizadas}))
    setClicouCurtiu(false)
    console.log(curtiu)
  }

  const handleSalvarPost = async()=>{
    setClicouSalvou(true)
    if (salvou) {
      const res = await postUtils.removerPostSalvo(postId)
      if(res==200){
        // setSalvou(false)
        abrirToast(toast, 'success', 'Publicação removida da coleção com sucesso.', '', 1000, false)
        setSalvou((prevSalvou) => !prevSalvou)
      }
    }else{
      const res = await postUtils.salvarPost(postId)
      if(res==200){
        abrirToast(toast, 'success', 'Publicação salva com sucesso.', '', 1000, false)
        setSalvou((prevSalvou) => !prevSalvou)
      }
    }
    const listaDeSalvosAtualizada = await buscarColecao()
    dispatch(setarUsuario({...usuario, colecaoSalvos: listaDeSalvosAtualizada}))
    setClicouSalvou(false)
  }
      const handleClickComentario = () =>{
        navigation.navigate('expandido', {post: postObject, veioDeComentario: true})
      }
      
      const handleIrProPerfil = () =>{
        navigation.navigate('outro-perfil', {userId})
      }
      
      const handleIsSalvo = async() =>{
        const checkIsSalvo = await usuario.colecaoSalvos.some(dado => dado.postId == postId)
        setSalvou(checkIsSalvo)
      }
      useEffect(()=>{
        handleIsSalvo()
      }, [usuario.colecaoSalvos, clicouSalvou])
      
      const handleIsCurtido = async()=>{
        const checkIsCurtido = await usuario.idPostsCurtidos.some(dado => dado == postId)
        setCurtiu(checkIsCurtido)
      }
      
      useEffect(()=>{
        handleIsCurtido()
      }, [clicouCurtiu, usuario.idPostsCurtidos])
      return (
        <>
    <Pressable onPress={()=> navigation.navigate('expandido', {postId: postId})} {...rest}>
        <FullRounded bg="$white" w={rw ? rw : menu ? "90%" : "100%"} py={20} px={10} pr={20} {...rest}>
        <Box flexDirection="row" w="100%">
            <Pressable $active-opacity={0.6} onPress={handleIrProPerfil} h={42}>
              <LazyImage imagem={imagemPerfil || usuarioIcon} style={{width: 40, height: 40, borderRadius: 50, }} placeholder=''/>
            </Pressable >
            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">
                <Box>
                    <TextoNegrito >{nomeUsuario}</TextoNegrito>
                    <Text fontFamily="Poppins_500Medium" color="#b6b3b3" fontSize={14}>{tagUsuario}</Text>
                </Box>
                {descricaoPost && <Text fontFamily="Poppins_500Medium" fontSize={14}>{textoResumido}{descricaoPost.length>100 && !mostrarTextoCompleto ? '...' : ''}</Text> }
                {descricaoPost.length>100 && (
                  <Pressable onPress={()=>setMostrarTextoCompleto(!mostrarTextoCompleto)} >
                    <TextoNegrito color='$lightSete'>{mostrarTextoCompleto ? 'Mostrar menos' : 'Ler mais'}</TextoNegrito>
                  </Pressable>
                )}
                <ScrollView flexDirection="row" horizontal showsHorizontalScrollIndicator={false} mt={10}>
                    {imagemPost && imagemPost.map((imagem, index) =>  (imagem && (<Pressable $active-opacity={0.6} onPress={()=>handleExpandirFoto(index)}>
                                                        <LazyImage imagem={imagem} style={{marginRight: 10, borderRadius: 10, width: 200, height: 200}}/>
                                                    </Pressable>))
                                )}
                </ScrollView>

            <Box flexDirection="column" ml={5} justifyContent="center" w="80%" flexWrap="nowrap">

            <Box flexDirection="row" display="flex" mt={10}>
                <Box flexDirection="row" w="95%" gap={10}>
                  {/* {!clicouCurtiu ? <BotaoCurtirPost onPress={handleCurtirPost} curtiu={curtiu}/> : <BareLoading />} */}
                  {/* {!clicouSalvou ? <BotaoSalvar onPress={handleSalvarPost} salvou={salvou}/> : <BareLoading />} */}
                  <BotaoCurtirPost onPress={handleCurtirPost} curtiu={curtiu}/>
                  <BotaoSalvar onPress={handleSalvarPost} salvou={salvou}/>
                </Box>
                {botaoComentario && <BotaoComentar justifyContent="flex-end" onPress={handleClickComentario}/>}
            </Box>
            </Box>

        </Box>
            {menu && <MenuPost userId={userId} postId={postId}/>}
        </Box>
        </FullRounded>
    </Pressable>
        <ImageView
          images={imagensFormatadas}
          imageIndex={index}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          backgroundColor="#000"
          presentationStyle="overFullScreen"
        />
  </>
    
  );
}
