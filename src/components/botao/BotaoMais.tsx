import { Pressable, Icon, } from "@gluestack-ui/themed"
import {EditIcon, RotateCcw } from 'lucide-react-native'

export function BotaoNovoPost({...rest}){
    return <Pressable $active-bg='$lightTres' bg='$lightQuatro' p={20} rounded={30} {...rest}>
                <Icon as={EditIcon} color='$white' />
        </Pressable>
}

export function BotaoRecarregarPosts({...rest}){
    return <Pressable $active-bg='$lightTres' bg='$lightQuatro' p={10} rounded={30} {...rest}>
            <Icon size='2xs' as={RotateCcw} color='$white' />
    </Pressable>
}