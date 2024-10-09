import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import LinearGradientMoots from "../../components/LinearGradientMoots";

export default function Colecao({navigation}){
    return(
        <LinearGradientMoots>
            <CabecalhoPerfil navigation={navigation} titulo="Sua coleção"/>
        </LinearGradientMoots>
    )
}