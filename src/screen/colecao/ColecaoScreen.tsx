import { ScrollView } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";

export default function Colecao(){
    return(
        <LinearGradientMoots>
            <ScrollView h="100%">
                <CabecalhoPerfil titulo="Sua coleção" mb={10}/>
            </ScrollView>
        </LinearGradientMoots>
    )
}