import { Box, Image } from "@gluestack-ui/themed";

const BotaoVoltar =  require('../assets/backButton.png')

type props = {
    extended: boolean
}

export default function BarraPesquisa({extended}: props){
    return(
        <Box w="100%" minH={70} bg="$white">
            {extended && (
                <Image source={BotaoVoltar} size="2xs"/>
            )}
        </Box>
    )
}