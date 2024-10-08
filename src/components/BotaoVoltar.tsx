import { styled } from "@gluestack-style/react"
import { Image, Pressable } from "@gluestack-ui/themed"

const VoltarIcon = require('../assets/VoltarIcon.png')

const StyledButton = styled(Pressable, {
    
})

export default function BotaoVoltar({navigation, voltarPara, ...rest}: any){
    return(
        <StyledButton onPress={()=>navigation.navigate(voltarPara)} {...rest}>
            <Image source={VoltarIcon} size="2xs"/>
        </StyledButton>
    )
}