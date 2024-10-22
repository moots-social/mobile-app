import { Image, Pressable } from "@gluestack-ui/themed"
import { useContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import {Asset, ImageLibraryOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ImagemContext } from "../context/PostContext";

const coracaoIcon = require('../assets/CoracaoIcon.png')
const descurtirIcon = require('../assets/DescurtirIcon.png')
const salvarIcon = require('../assets/SalvarIcon.png')
const comentarioIcon = require('../assets/ComentarioIcon.png')
const galeriaIcon = require('../assets/GaleriaIcon.png')
const cameraIcon = require('../assets/CameraIcon.png')
const enviarIcon = require('../assets/EnviarIconRounded.png')

//ao atualizar tamanho do botão, atualizar também tamanho da imagem
interface IBotaoComentarioProps{
    imgW: number,
    imgH: number
}

interface IBotaoPostProps{
    size: string,
}


//abaixo somente comentario
export function BotaoCurtirComentario({imgW, imgH, ...rest}: IBotaoComentarioProps){
    return(
        <Pressable {...rest}>
            <Image source={coracaoIcon} w={imgW} h={imgH}/>
        </Pressable>
    )
}
export function BotaoDescurtirComentario({ imgW, imgH, ...rest}: IBotaoComentarioProps){
    return(
        <Pressable {...rest}>
            <Image source={descurtirIcon} w={imgW} h={imgH}/>
        </Pressable>
    )
}

//abaixo somente post existente
export function BotaoCurtirPost({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={coracaoIcon} size={size}/>
        </Pressable>
    )
}
export function BotaoDescurtirPost({ size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={descurtirIcon} size={size}/>
        </Pressable>
    )
}
export function BotaoSalvar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={salvarIcon} size={size}/>
        </Pressable>
    )
}
export function BotaoComentar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={comentarioIcon} size={size}/>
        </Pressable>
    )
}

//abaixo somente para novopost
export function BotaoGaleria({...rest}){
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])

    const pedirPermissao = async()=>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if(status!=='granted') alert('negado')
    }
    
    const selecionarImagem= async()=>{
        await pedirPermissao()
        let resultado = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            selectionLimit: 4,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1, 
    
        })
    
        if (!resultado.canceled) {
            setImagens(resultado.assets)
        }
    }
    return(
        <Pressable w={30} h={20} {...rest} onPress={selecionarImagem}>
            <Image source={galeriaIcon} w={26} h={20}/>
        </Pressable>
    )
}

export function BotaoCamera({...rest}){
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])

    const tirarFoto= async()=>{
        let resultado = await ImagePicker.launchCameraAsync({
            allowsMultipleSelection: true,
            selectionLimit: 4,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1, 
    
        })
    
        if (!resultado.canceled) {
            setImagens(resultado.assets)
        }
    }

    return(
        <Pressable w={30} h={20} onPress={tirarFoto} {...rest}>
            <Image source={cameraIcon} w={28} h={20}/>
        </Pressable>
    )
}

export function BotaoEnviarNovoPost({...rest}){
    return(
        <Pressable {...rest} >
            <Image source={enviarIcon} w={20} h={20}/>
        </Pressable>
    )
}