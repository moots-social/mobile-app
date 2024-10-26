import { Box, Text } from "@gluestack-ui/themed"
import CabecalhoIcone from "./CabecalhoIcone"
import BotaoNovoChat from "./BotaoMais"

export default function TelaTituloCabecalho({titulo, temBotaoMais=false}){
    return( <>
            <CabecalhoIcone />
            <Box alignSelf="center" mt={30}>
                <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">{titulo}</Text>
            </Box>
            {temBotaoMais &&(
                <Box position="absolute" top="85%" right="5%">
                    <BotaoNovoChat />
                </Box>  
            )}
        </>
    )
}