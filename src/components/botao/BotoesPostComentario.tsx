import { Icon, Image, Pressable, TrashIcon } from "@gluestack-ui/themed"
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker'

const coracaoIcon = require('../../assets/CoracaoIcon.png')
const coracaoCurtidoIcon = require('../../assets/coracaoCurtido.png')
const descurtirIcon = require('../../assets/DescurtirIcon.png')
const salvarIcon = require('../../assets/SalvarIcon.png')
const salvouIcon = require('../../assets/SalvouIcon.png')
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
        <Pressable {...rest}>
            <Image source={coracaoIcon} w={imgW} h={imgH} alt='curtir comentario'/>
        </Pressable>
    )
}
export function BotaoDescurtirComentario({ imgW, imgH, ...rest}: IBotaoComentarioProps){
    return(
        <Pressable {...rest}>
            <Image source={descurtirIcon} w={imgW} h={imgH} alt='não curti'/>
        </Pressable>
    )
}
export function BotaoExcluirComentario({imgW, imgH, ...rest}){
    return <Pressable {...rest}>
        <Icon as={TrashIcon} w={imgW} h={imgH}/>
    </Pressable>
}

//abaixo somente post existente
export function BotaoCurtirPost({size, curtiu, ...rest}){
    return(
        <Pressable {...rest}>
            <Image source={!curtiu ? coracaoIcon : coracaoCurtidoIcon} size={size} alt='curtir post'/>
        </Pressable>
    )
}
export function BotaoDescurtirPost({ size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={descurtirIcon} size={size} alt='não curti'/>
        </Pressable>
    )
}
export function BotaoSalvar({size, salvou, ...rest}){
    return(
        <Pressable {...rest}>
            <Image source={!salvou ? salvarIcon : salvouIcon} size={size} alt='salvar'/>
        </Pressable>
    )
}
export function BotaoComentar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={comentarioIcon} size={size} alt='comentar'/>
        </Pressable>
    )
}

//abaixo somente para novopost
export function BotaoGaleria({...rest}){
    
    return(
        <Pressable w={30} h={20} {...rest}>
            <Image source={galeriaIcon} w={26} h={20} alt='abrir galeria'/>
        </Pressable>
    )
}

export function BotaoCamera({...rest}){
    const [ imagens, setImagens ]= useState<ImagePicker.ImagePickerAsset[]>([])

    

    return(
        <Pressable w={30} h={20} {...rest}>
            <Image source={cameraIcon} w={28} h={20} alt='abrir câmera'/>
        </Pressable>
    )
}

export function BotaoEnviarNovoPost({...rest}){
    return(
        <Pressable {...rest} >
            <Image source={enviarIcon} w={20} h={20} alt='enviar post'/>
        </Pressable>
    )
}