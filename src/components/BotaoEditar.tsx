import { Image, Pressable } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

const botaoEditar = require('../assets/BotaoEditar.png')

export default function BotaoEditar({...rest}){
    const navigation = useNavigation()

    return <Pressable onPress={()=>navigation.navigate('editar')} {...rest}>
                <Image source={botaoEditar} w={70} h={70}/>
            </Pressable>
}