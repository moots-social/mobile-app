import { Box, Text } from "@gluestack-ui/themed";
import { RoundedBottom } from "../geral/Rounded";
import BotaoVoltar from "../botao/BotaoVoltar";
import { MenuPost } from "../post/PostMenu";

export default function CabecalhoPerfil({titulo='', temBotaoVoltar=true, postExpandido=false, fontSize=24, userId, ...rest}){
    
    return (
        <RoundedBottom bg="$white" display="flex" flexDirection="row" justifyContent={temBotaoVoltar ? "space-between" : 'center'} alignItems="center" py={20} px={20} pt={40} zIndex={1} {...rest}>
            {temBotaoVoltar && <BotaoVoltar />}
            <Text fontFamily="Poppins_600SemiBold" fontSize={fontSize} color="$black" display="flex" justifyContent="center">{titulo}</Text>
            {temBotaoVoltar && <Box w={20}>{postExpandido && <MenuPost userId={userId}/>}</Box>}
        </RoundedBottom>
    )
}