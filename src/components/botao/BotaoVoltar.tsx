import { Image, Pressable } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

const VoltarIcon = require('../../assets/VoltarIcon.png')

export default function BotaoVoltar({onPress, ...rest}: any){
    const navigation = useNavigation()

    return(
        <Pressable onPress={onPress ? onPress : ()=>navigation.goBack()} {...rest}>
            <Image source={VoltarIcon} size="2xs" alt='voltar'/>
        </Pressable>
    )
}