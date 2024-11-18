import { ScrollView } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";

export default function Moderador(){
    //to-do: funções para excluir post e zerar contador de denuncias do post dentro do menu
    return (
        <LinearGradientMoots>
            <ScrollView>
                <CabecalhoPerfil titulo="Moderador" mb={5}/>
                <TextoNegrito alignSelf='center' mt={15}>Sem publicações denunciadas.</TextoNegrito>
            </ScrollView>
        </LinearGradientMoots>
    )
}