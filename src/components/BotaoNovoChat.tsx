import { Image } from "@gluestack-ui/themed"
import { Pressable } from "react-native"

const botaoNovoChat = require('../assets/plusButton.png')

export default function BotaoNovoChat(){
    return <Pressable>
            <Image source={botaoNovoChat} size="md"/>
        </Pressable>
}