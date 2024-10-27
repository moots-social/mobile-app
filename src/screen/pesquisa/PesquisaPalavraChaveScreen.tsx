import { useRoute } from "@react-navigation/native";
import BarraPesquisa from "../../components/barra/BarraPesquisa";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";

export default function PesquisaPalavraChave(){
    const {valor} = useRoute().params
    return(
        <LinearGradientMoots>
            <BarraPesquisa extended={false} valorParam={valor}/>
        </LinearGradientMoots>
    )
}