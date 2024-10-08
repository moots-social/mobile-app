import { styled } from "@gluestack-style/react"
import { Image, Pressable } from "@gluestack-ui/themed"

const VoltarIcon = require('../assets/VoltarIcon.png')

export default function BotaoVoltar({navigation, voltarPara, ...rest}: any){
    return(
        <Pressable onPress={()=>navigation.navigate(voltarPara)} {...rest}>
            <Image source={VoltarIcon} size="2xs"/>
        </Pressable>
    )
}