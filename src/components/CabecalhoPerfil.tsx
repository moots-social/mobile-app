import { Box, Image, Text } from "@gluestack-ui/themed";
import { RoundedBottom } from "./Rounded";
import BotaoVoltar from "./BotaoVoltar";

export default function CabecalhoPerfil({titulo='', temBotaoVoltar=true, ...rest}){
    
    return (
        <RoundedBottom bg="$white" display="flex" flexDirection="row" justifyContent={temBotaoVoltar ? "space-between" : 'center'} alignItems="center" py={20} px={20} zIndex={1} {...rest}>
            {temBotaoVoltar && <BotaoVoltar />}
            <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black" display="flex" justifyContent="center">{titulo}</Text>
            {temBotaoVoltar && <Box w={20}></Box>}
        </RoundedBottom>
    )
}