import { Pressable, Image} from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

const seguirIcon = require('../assets/SeguirIcon.png')
const listaIcon = require('../assets/ListaIcon.png')
const editarIcon = require('../assets/EditarIcon.png')

export function BotaoSeguir({imgW=20, imgH=16, ...rest}){
    return(
        <Pressable bg="$lightTres" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={seguirIcon} w={imgW} h={imgH} m={10}/>
        </Pressable>
    )
}
export function BotaoConfigurar({imgW=10, imgH=10, ...rest}){
    const navigation = useNavigation()
    return(
        <Pressable bg="$lightTres" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" onPress={()=>navigation.navigate('editar')} {...rest}>
            <Image source={editarIcon} w={imgW} h={imgH} m={10}/>
        </Pressable>
    )
}
export function BotaoListaSeguidores({imgW=16, imgH=16, ...rest}){
    return(
        <Pressable bg="$lightDois" borderWidth={1} borderColor="$black" justifyContent="center" alignItems="center" {...rest}>
            <Image source={listaIcon} w={imgW} h={imgH} m={10}/>
        </Pressable>
    )
}