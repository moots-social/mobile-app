import { Pressable } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { LazyIcon } from "../geral/LazyImage"
const VoltarIcon = require('../../assets/VoltarIcon.png')

export default function BotaoVoltar({onPress, ...rest}: any){
    const navigation = useNavigation()

    return(
        <Pressable onPress={onPress ? onPress : ()=>navigation.goBack()} {...rest}>
            <LazyIcon imagem={VoltarIcon} style={{width: 28, height: 28}}/>
        </Pressable>
    )
}