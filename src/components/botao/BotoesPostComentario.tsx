import { Icon, Image, Pressable, TrashIcon } from "@gluestack-ui/themed"
import { LazyIcon } from "../geral/LazyImage";
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import { useEffect, useState } from "react";

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
    return <Pressable $active-opacity={0.6} {...rest}>
        <Icon as={TrashIcon} w={imgW} h={imgH}/>
    </Pressable>
}

//abaixo somente post existente
export function BotaoCurtirPost({curtiu, ...rest}){
    const scale = useSharedValue(curtiu ? 1 : 0.8)

    useEffect(()=>{
        scale.value = withTiming(curtiu ? 1 : 0.8, { duration: 100 });
    }, [curtiu])

    return(
        <Pressable $active-opacity={0.6} {...rest}>
            <Animated.Image 
                source={!curtiu ? coracaoIcon : coracaoCurtidoIcon}
                style={{
                    width: 33,
                    height: 28,
                    transform: [{scale}],
                }}
            />
        </Pressable>
    )
}

export function BotaoSalvar({salvou, ...rest}){
        const scale = useSharedValue(salvou ? 1 : 0.8)

        useEffect(()=>{
            scale.value = withTiming(salvou ? 1 : 0.8, { duration: 100 });
        }, [salvou])
        return(
        <Pressable $active-opacity={0.6} {...rest}>
            <Animated.Image 
                source={!salvou ? salvarIcon : salvouIcon}
                style={{
                    width: 28,
                    height: 28,
                    transform: [{scale}],
                }}
            />
        </Pressable>
    )
}
export function BotaoComentar({size, ...rest}: IBotaoPostProps){
    return(
        <Pressable $active-opacity={0.6} {...rest}>
            <LazyIcon imagem={comentarioIcon} style={{width: 28, height: 28}} />
        </Pressable>
    )
}

//abaixo somente para novopost
export function BotaoGaleria({...rest}){
    
    return(
        <Pressable $active-opacity={0.6} w={30} h={20} {...rest}>
            <LazyIcon imagem={galeriaIcon} style={{width: 26, height: 20}}/>
        </Pressable>
    )
}

export function BotaoCamera({...rest}){

    return(
        <Pressable $active-opacity={0.6} w={30} h={20} {...rest}>
            <LazyIcon imagem={cameraIcon} style={{width: 28, height: 20}}/>
        </Pressable>
    )
}

export function BotaoEnviarNovoPost({...rest}){
    return(
        <Pressable $active-opacity={0.6} {...rest} >
            <LazyIcon imagem={enviarIcon} style={{width: 20, height: 20}}/>
        </Pressable>
    )
}