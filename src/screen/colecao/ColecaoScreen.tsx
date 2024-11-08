import { ScrollView } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";

export default function Colecao(){
    return(
        <LinearGradientMoots>
            <ScrollView>
                <CabecalhoPerfil titulo="Sua coleção" temBotaoVoltar={false}/>
            </ScrollView>
        </LinearGradientMoots>
    )
}