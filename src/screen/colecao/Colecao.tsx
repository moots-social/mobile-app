import { ScrollView } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import Post from "../../components/Post.tsx";

export default function Colecao(){
    return(
        <LinearGradientMoots>
            <ScrollView h="100%">
                <CabecalhoPerfil titulo="Sua coleção" mb={10}/>
            </ScrollView>
        </LinearGradientMoots>
    )
}