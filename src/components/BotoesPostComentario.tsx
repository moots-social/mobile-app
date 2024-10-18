import { Image, Pressable } from "@gluestack-ui/themed"

const coracaoIcon = require('../assets/CoracaoIcon.png')
const descurtirIcon = require('../assets/DescurtirIcon.png')
const salvarIcon = require('../assets/SalvarIcon.png')
const comentarioIcon = require('../assets/ComentarioIcon.png')

//ao atualizar tamanho do botão, atualizar também tamanho da imagem
interface IBotaoComentarioProps{
    imgW: number,
    imgH: number
}

interface IBotaoPostProps{
    size: string,
}

//somente comentario
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

//abaixo somente para post
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