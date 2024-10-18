import { Image } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { Pressable } from "react-native"

const maisIcon = require('../assets/MaisIcon.png')

export function BotaoNovoPost({...rest}){
    const navigation = useNavigation()

    return <Pressable {...rest} onPress={()=>navigation.navigate('novoPost')}>
            <Image source={maisIcon} w={70} h={70}/>
        </Pressable>
}

export function BotaoNovoChat({...rest}){
    return <Pressable {...rest}>
            <Image source={maisIcon} w={70} h={70}/>
        </Pressable>
}