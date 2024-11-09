import { Box, Image, Pressable, ScrollView, Text, Textarea, TextareaInput, useToast } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { RoundedBottom } from "../../components/geral/Rounded";
import { TextoNegrito } from "../../components/geral/Texto";
import { BotaoCamera, BotaoEnviarNovoPost, BotaoGaleria} from "../../components/botao/BotoesPostComentario";
import { useEffect, useState } from "react";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { abrirToast } from "../../components/geral/ToastMoots";
import { enviarNovoPost } from "../../utils/postUtils";
import * as ImagePicker from 'expo-image-picker'
import ImageView from "react-native-image-viewing"


const usuarioIcon = require('../../assets/UsuarioIcon.png')

export default function NovoPost({navigation}){
    const toast = useToast()
    const [texto, setTexto] = useState<string>('')
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])
    const [uris, setUris] = useState<string[]>([])
    const [isVisible, setIsVisible] = useState(false)
    const [index, setIndex] = useState<number>(0)
    
    const handleExpandirFoto = (novoIndex: number) =>{
            setIndex(novoIndex)
            setIsVisible(true)
            setIndex(novoIndex)
            novoIndex++
        }

    const handleSubmit = async()=>{
        try {
            if(texto === '' && imagens.length == 0){
                abrirToast(toast, 'error', 'Digite algo ou selecione uma imagem para criar uma nova publicação.')
            }else{ 
                const resultado = await enviarNovoPost(texto, uris)
                if(resultado){
                    abrirToast(toast, 'success', 'Publicação enviada com sucesso.', '', 1000, false)
                    navigation.navigate('tabs')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const selecionarImagem = async()=>{
        let resultado = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            selectionLimit: 4,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        })

        if (!resultado.canceled) {
            setImagens(resultado.assets)
        } else setImagens([...imagens])
    }

    useEffect(()=>{
        const getUriImagens = ()=>{
            imagens.some((imagem)=>{
                setUris([...uris, imagem.uri])
            })
        }

        getUriImagens()
    }, [imagens])

    const {usuario} = useUsuarioContext()
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
                                    <Textarea ml={38} brw={0} w="85%" minHeight={100} maxHeight={150} bottom={10} onChange={(text)=>setTexto(text)}>
                                        <TextareaInput fontFamily="Poppins_500Medium" placeholder="No que você está pensando?" />
                                    </Textarea>
                                    <ScrollView flexDirection="row" horizontal >
                                    {imagens.length>0 && imagens.map((imagem, i = 0) => {
                                            return <Pressable onPress={()=>handleExpandirFoto(i)}>
                                                    <Image source={imagem.uri} mr={10} rounded={10} h={200} w={200}/>
                                                </Pressable>
                                        })}
                                    </ScrollView>
                                </Box>
                            </Box>
                            <Box flexDirection="row" justifyContent="space-between" pt={imagens.length>0 && 20}>
                                <Box flexDirection="row">
                                    <BotaoGaleria onPress={selecionarImagem}/>
                                    <BotaoCamera />
                                </Box>
                                <BotaoEnviarNovoPost onPress={handleSubmit}/>
                            </Box>
                        </Box>
                    </RoundedBottom>
                </ScrollView>
            </LinearGradientMoots>
    )
}