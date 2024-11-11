import { Image, Pressable } from "@gluestack-ui/themed"
import { createContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from "react-native-gesture-handler";

const coracaoIcon = require('../../assets/CoracaoIcon.png')
const descurtirIcon = require('../../assets/DescurtirIcon.png')
const salvarIcon = require('../../assets/SalvarIcon.png')
const comentarioIcon = require('../../assets/ComentarioIcon.png')
const galeriaIcon = require('../../assets/GaleriaIcon.png')
const cameraIcon = require('../../assets/CameraIcon.png')
const enviarIcon = require('../../assets/EnviarIconRounded.png')

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
        <TouchableOpacity {...rest}>
            <Image source={coracaoIcon} w={imgW} h={imgH} alt='curtir comentario'/>
        </TouchableOpacity>
    )
}
export function BotaoDescurtirComentario({ imgW, imgH, ...rest}: IBotaoComentarioProps){
    return(
        <TouchableOpacity {...rest}>
            <Image source={descurtirIcon} w={imgW} h={imgH} alt='não curti'/>
        </TouchableOpacity>
    )
}

//abaixo somente post existente
export function BotaoCurtirPost({size, ...rest}: IBotaoPostProps){
    return(
        <TouchableOpacity {...rest}>
            <Image source={coracaoIcon} size={size} alt='curtir post'/>
        </TouchableOpacity>
    )
}
export function BotaoDescurtirPost({ size, ...rest}: IBotaoPostProps){
    return(
        <TouchableOpacity {...rest}>
            <Image source={descurtirIcon} size={size} alt='não curti'/>
        </TouchableOpacity>
    )
}
export function BotaoSalvar({size, ...rest}: IBotaoPostProps){
    return(
        <TouchableOpacity {...rest}>
            <Image source={salvarIcon} size={size} alt='salvar'/>
        </TouchableOpacity>
    )
}
export function BotaoComentar({size, ...rest}: IBotaoPostProps){
    return(
        <TouchableOpacity {...rest}>
            <Image source={comentarioIcon} size={size} alt='comentar'/>
        </TouchableOpacity>
    )
}

//abaixo somente para novopost
export function BotaoGaleria({...rest}){
    
    return(
        <TouchableOpacity w={30} h={20} {...rest}>
            <Image source={galeriaIcon} w={26} h={20} alt='abrir galeria'/>
        </TouchableOpacity>
    )
}

export function BotaoCamera({...rest}){
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])

    

    return(
        <TouchableOpacity w={30} h={20} {...rest}>
            <Image source={cameraIcon} w={28} h={20} alt='abrir câmera'/>
        </TouchableOpacity>
    )
}

export function BotaoEnviarNovoPost({...rest}){
    return(
        <TouchableOpacity {...rest} >
            <Image source={enviarIcon} w={20} h={20} alt='enviar post'/>
        </TouchableOpacity>
    )
}