import { Image, Pressable } from "@gluestack-ui/themed"
import { createContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker'

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

//abaixo somente post existente
export function BotaoCurtirPost({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={coracaoIcon} size={size} alt='curtir post'/>
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
export function BotaoSalvar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable {...rest}>
            <Image source={salvarIcon} size={size} alt='salvar'/>
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
// BotaoGaleria
export function BotaoGaleria({ onUpdateImagens, ...rest }) {
    const selecionarImagem = async () => {
        let resultado = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        selectionLimit: 4,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        });

        if (!resultado.canceled) {
        onUpdateImagens(resultado.assets);  // Passa as imagens selecionadas para o pai
        }
    };

    return (
        <Pressable w={30} h={20} {...rest} onPress={selecionarImagem}>
        <Image source={galeriaIcon} w={26} h={20} alt="abrir galeria" />
        </Pressable>
    );
}
  
// BotaoCamera
export function BotaoCamera({ onUpdateImagens, ...rest }) {
    const tirarFoto = async () => {
        let resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 4,
        aspect: [4, 3],
        quality: 1,
        });

        if (!resultado.canceled) {
        onUpdateImagens(resultado.assets);
        }
    };

    return (
        <Pressable w={30} h={20} onPress={tirarFoto} {...rest}>
        <Image source={cameraIcon} w={28} h={20} alt="abrir câmera" />
        </Pressable>
    );
}


export function BotaoEnviarNovoPost({...rest}){
    return(
        <Pressable {...rest} >
            <Image source={enviarIcon} w={20} h={20} alt='enviar post'/>
        </Pressable>
    )
}