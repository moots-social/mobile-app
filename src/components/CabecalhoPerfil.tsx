import { Box, Image, Text } from "@gluestack-ui/themed";
import { RoundedBottom } from "./Rounded";
import BotaoVoltar from "./BotaoVoltar";

type CabecalhoPerfilProps = {
    navigation?: any,
    voltarPara?: string,
    titulo?: string,
    temBotaoVoltar?: boolean,
}

export default function CabecalhoPerfil({navigation, voltarPara='perfil', titulo='', temBotaoVoltar=true, ...rest}: CabecalhoPerfilProps){
    return (
        <RoundedBottom bg="$white" display="flex" flexDirection="row" justifyContent={temBotaoVoltar ? "space-between" : 'center'} alignItems="center" py={20} px={20} zIndex={1} {...rest}>
            {temBotaoVoltar && <BotaoVoltar navigation={navigation} voltarPara={voltarPara}/>}
            <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black" display="flex" justifyContent="center">{titulo}</Text>
            {temBotaoVoltar && <Box w={20}></Box>}
        </RoundedBottom>
    )
}