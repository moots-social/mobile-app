import { Box, Image, Text } from "@gluestack-ui/themed";
import { RoundedBottom } from "./Rounded";
import BotaoVoltar from "./BotaoVoltar";

export default function CabecalhoPerfil({navigation, voltarPara='perfil', titulo='', ...rest}){
    return (
        <RoundedBottom bg="$white" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" py={20} px={20} zIndex={1} {...rest}>
            <BotaoVoltar navigation={navigation} voltarPara={voltarPara}/>
            <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black" display="flex" justifyContent="center">{titulo}</Text>
            <Image size="2xs" source={''}/>
        </RoundedBottom>
    )
}