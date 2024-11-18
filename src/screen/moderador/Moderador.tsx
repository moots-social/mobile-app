import { ScrollView } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";

export default function Moderador(){
    return (
        <LinearGradientMoots>
            <ScrollView>
                <CabecalhoPerfil titulo="Moderador" mb={5}/>
                <TextoNegrito alignSelf='center' mt={15}>Sem publicações denunciadas.</TextoNegrito>
            </ScrollView>
        </LinearGradientMoots>
    )
}