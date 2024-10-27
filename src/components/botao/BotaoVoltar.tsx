import { Image, Pressable } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"

const VoltarIcon = require('../../assets/VoltarIcon.png')

export default function BotaoVoltar({...rest}: any){
    const navigation = useNavigation()

    return(
        <Pressable onPress={()=>navigation.goBack()} {...rest}>
            <Image source={VoltarIcon} size="2xs" alt='voltar'/>
        </Pressable>
    )
}