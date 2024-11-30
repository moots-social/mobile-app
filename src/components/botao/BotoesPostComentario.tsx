import { Icon, Image, Pressable, TrashIcon } from "@gluestack-ui/themed"
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import { LazyIcon } from "../geral/LazyImage";

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
    imgW: number | string,
    imgH: number | string
}

interface IBotaoPostProps{
    size: string,
}


//abaixo somente comentario
export function BotaoExcluirComentario({imgW, imgH, ...rest}: IBotaoComentarioProps){
    return <Pressable {...rest}>
        <Icon as={TrashIcon} w={imgW} h={imgH}/>
    </Pressable>
}

//abaixo somente post existente
export function BotaoCurtirPost({curtiu, ...rest}){
    return(
        <Pressable {...rest}>
            <LazyIcon imagem={!curtiu ? coracaoIcon : coracaoCurtidoIcon} style={{width: 33, height: 28}}/>
        </Pressable>
    )
}

export function BotaoSalvar({salvou, ...rest}){
    return(
        <Pressable {...rest}>
            <LazyIcon imagem={!salvou ? salvarIcon : salvouIcon} style={{width: 28, height: 28}}/>
        </Pressable>
    )
}
export function BotaoComentar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            {/* <Image source={comentarioIcon} size={size} alt='comentar'/> */}
            <LazyIcon imagem={comentarioIcon} style={{width: 28, height: 28}} />
        </Pressable>
    )
}

//abaixo somente para novopost
export function BotaoGaleria({...rest}){
    
    return(
        <Pressable w={30} h={20} {...rest}>
            {/* <Image source={galeriaIcon} w={26} h={20} alt='abrir galeria'/> */}
            <LazyIcon imagem={galeriaIcon} style={{width: 26, height: 20}}/>
        </Pressable>
    )
}

export function BotaoCamera({...rest}){

    return(
        <Pressable w={30} h={20} {...rest}>
            <LazyIcon imagem={cameraIcon} style={{width: 28, height: 20}}/>
        </Pressable>
    )
}

export function BotaoEnviarNovoPost({...rest}){
    return(
        <Pressable {...rest} >
            <LazyIcon imagem={enviarIcon} style={{width: 20, height: 20}}/>
        </Pressable>
    )
}