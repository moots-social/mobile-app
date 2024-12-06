import { Image } from "expo-image";

interface ILazyProps{
    imagem: any,
    placeholder: any
}

const postPlaceholder = require('../../assets/PlaceholderImagemPost.png')
const iconPlaceholder = require('../../assets/PlaceholderIconMoots.png')

export function LazyImage({imagem, placeholder, ...rest}: Partial<ILazyProps>){
    return <Image 
            source={{uri: imagem}}
            priority='low' 
            cachePolicy='memory-disk'
            alt=''
            placeholder={placeholder || postPlaceholder}
            placeholderContentFit="fill"
            {...rest}
            />
}

export function LazyIcon({imagem, placeholder, ...rest}: Partial<ILazyProps>){
    return <Image
            source={imagem}
            priority='high'
            cachePolicy='memory-disk'
            placeholder={placeholder || iconPlaceholder}
            placeholderContentFit="fill"
            {...rest}/>
}