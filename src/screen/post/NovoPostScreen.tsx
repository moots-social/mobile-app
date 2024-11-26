import { Box, CloseIcon, Icon, Image, Pressable, ScrollView, Text, Textarea, TextareaInput, useToast} from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { RoundedBottom } from "../../components/geral/Rounded";
import { TextoNegrito } from "../../components/geral/Texto";
import { useEffect, useState } from "react";
import { abrirToast } from "../../components/geral/ToastMoots";
import { enviarNovoPost } from "../../utils/postUtils";
import * as ImagePicker from 'expo-image-picker'
import ImageView from "react-native-image-viewing"
import { TouchableOpacity } from "react-native-gesture-handler";
import { BotaoCamera, BotaoEnviarNovoPost, BotaoGaleria} from "../../components/botao/BotoesPostComentario";
import { Alert } from "react-native";

import { usuarioIcon } from "../../components/perfil/PerfilComponents";
import { useSelector } from "react-redux";

export default function NovoPost({navigation}){
    const toast = useToast()
    const [ texto, setTexto ] = useState<string>('')
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])
    const [uris, setUris] = useState<string[]>([''])
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState<number>(0)
    const usuario = useSelector((state)=> state.usuario.user)
    
    const handleExpandirFoto = (index: number) => {
        setIndex(index);
        setIsVisible(true);
      };

    const handleSubmit = async()=>{
        try {
            if(texto === '' && imagens.length == 0){
                abrirToast(toast, 'error', 'Digite algo ou selecione uma imagem para criar uma nova publicação.')
            }else{ 
                const resultado = await enviarNovoPost(texto, uris)
                if(resultado && resultado.resultado === 'Post enviado com sucesso.'){
                    navigation.navigate('tabs')
                    abrirToast(toast, 'success', 'Publicação enviada com sucesso.', '', 2000, false)
                    setImagens([])
                    setUris([])
                    setTexto('')
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const selecionarImagem = async()=>{
        if(imagens.length==4){
                abrirToast(toast, 'error', 'Quatro imagens já foram selecionadas para serem enviadas. Se deseja enviar outra imagem, exclua uma das imagens selecionadas.')
        }else{
            let selectionLimit: number = 4 - imagens.length
            console.log(selectionLimit)
            let resultado = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                selectionLimit: selectionLimit,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 0.7,
            })
    
            if (!resultado.canceled) {
                setImagens([...imagens, ...resultado.assets])
            } else setImagens([...imagens])
        }
    }

    const tirarFoto= async()=>{
        if(imagens.length==4){
            abrirToast(toast, 'error', 'Quatro imagens já foram selecionadas para serem enviadas. Se deseja enviar outra imagem, exclua uma das imagens selecionadas.')
        }else{
            let resultado = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
            })
        
            if (!resultado.canceled) {
                setImagens([...imagens, ...resultado.assets])
            }else setImagens([...imagens])
        }
    }

    const handleRemoverImagem = (index: number) => {
        Alert.alert('Remover imagem', 'Deseja remover imagem da publicação a ser enviada?', [
            {
                text: 'Sim',
                onPress: () =>{
                    const novoArrayImagens = imagens.slice(0, index).concat(imagens.slice(index+1))
                    setImagens(novoArrayImagens)
                }
            },
            {   
                text: 'Não'
            }
        ]) 
    }

    useEffect(() => {
        const getUriImagens = () => {
            if(imagens.length>0) setUris(imagens.map((imagem) => imagem.uri))
        };
    
        getUriImagens()
      }, [imagens]);

    if(isVisible) return <ImageView 
                            images={imagens}
                            imageIndex={index}
                            visible={isVisible}
                            onRequestClose={()=>setIsVisible(false)}
                        />
    return(
            <LinearGradientMoots>
                <ScrollView>
                    <CabecalhoPerfil titulo="Nova publicação" zIndex={1}/>
                    <RoundedBottom zIndex={0} bg="$white" bottom={5} mb={10}>
                        <Box p={20} display="flex">
                            <Box display="flex">
                                <Box flexDirection="row" alignItems="center">
                                    <Image source={usuario.fotoPerfil || usuarioIcon} w={40} h={40} rounded={30}/>
                                    <TextoNegrito ml={2}>{usuario.nomeCompleto}</TextoNegrito>
                                </Box>
                                <Box justifyContent="center" >
                                    <Textarea ml={38} brw={0} w="85%" minHeight={100} maxHeight={150} bottom={10}>
                                        <TextareaInput fontFamily="Poppins_500Medium" placeholder="No que você está pensando?" value={texto} onChangeText={(text)=>setTexto(text)} />
                                    </Textarea>
                                    <ScrollView flexDirection="row" horizontal showsHorizontalScrollIndicator={false}>
                                    {imagens.length>0 && imagens.map((imagem, index) => {
                                            return <TouchableOpacity onLongPress={()=>handleRemoverImagem(index)} onPress={()=>handleExpandirFoto(index)}>
                                                    <Image source={imagem} mr={10} rounded={10} h={200} w={200}/>
                                                </TouchableOpacity>
                                        })}
                                    </ScrollView>
                                </Box>
                            </Box>
                            <Box flexDirection="row" justifyContent="space-between" pt={imagens.length>0 ? 20: 0}>
                                <Box flexDirection="row">
                                    <BotaoGaleria onPress={selecionarImagem}/>
                                    <BotaoCamera onPress={tirarFoto}/>
                                </Box>
                                <BotaoEnviarNovoPost onPress={handleSubmit}/>
                            </Box>
                        </Box>
                    </RoundedBottom>
                </ScrollView>
            </LinearGradientMoots>
    )
}
