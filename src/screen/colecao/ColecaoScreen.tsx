import { ScrollView } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import { TextoNegrito } from "../../components/geral/Texto";

export default function Colecao(){
    return(
        <LinearGradientMoots>
            <ScrollView>
                <CabecalhoPerfil titulo="Sua coleção" mb={5} temBotaoVoltar={false}/>
                <TextoNegrito alignSelf='center' mt={15}>Nenhum item salvo.</TextoNegrito>
            </ScrollView>
        </LinearGradientMoots>
    )
}