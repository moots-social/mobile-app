import { useRoute } from "@react-navigation/native";
import BarraPesquisa from "../../components/BarraPesquisa";
import LinearGradientMoots from "../../components/LinearGradientMoots";

export default function PesquisaPalavraChave(){
    const {valor} = useRoute().params
    return(
        <LinearGradientMoots>
            <BarraPesquisa extended={false} valorParam={valor}/>
        </LinearGradientMoots>
    )
}