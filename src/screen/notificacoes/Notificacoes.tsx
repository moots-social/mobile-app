import { Box, Text } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import Notificacao from "../../components/Notificacao";

export default function Notificacoes(){
    return (
        <LinearGradientMoots>
            <CabecalhoPerfil titulo="Notificações" temBotaoVoltar={false}/>
            <Box mt={35} alignItems="center">
                <Notificacao />
            </Box>
        </LinearGradientMoots>
    )
}