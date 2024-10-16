import { Image } from "@gluestack-ui/themed"

const coracaoIcon = require('../assets/CoracaoIcon.png')
const descurtirIcon = require('../assets/DescurtirIcon.png')
const salvarIcon = require('../assets/SalvarIcon.png')
const comentarioIcon = require('../assets/ComentarioIcon.png')

//post e comentario
export function BotaoCurtir({...rest}){
    return(
        <Image source={coracaoIcon} {...rest} />
    )
}
export function BotaoDescurtir({...rest}){
    return(
        <Image source={descurtirIcon} {...rest} />
    )
}

//ambos abaixo somente para post
export function BotaoSalvar({...rest}){
    return(
        <Image source={salvarIcon} {...rest} />
    )
}
export function BotaoComentar({...rest}){
    return(
        <Image source={comentarioIcon} {...rest} />
    )
}