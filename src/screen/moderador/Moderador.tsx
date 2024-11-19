import { ScrollView } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import { FullRounded } from "../../components/geral/Rounded";

export default function Moderador(){
    //to-do: funções para excluir post e zerar contador de denuncias do post dentro do menu
    return (
        <LinearGradientMoots>
            <ScrollView >
                <CabecalhoPerfil titulo="Moderador" mb={10}/>
                <FullRounded bg='$white' alignSelf='center' p='$2.5' w='95%' mb={10}>
                    <TextoNegrito>Última verificação: 19/11</TextoNegrito>
                    <TextoNegrito>Usuários recorrentes: testeuser</TextoNegrito>
                    <TextoNegrito mt={5}>Total de publicações denunciadas: 0</TextoNegrito>
                </FullRounded>
                {/* <TextoNegrito alignSelf='center' mt={15}>Sem publicações denunciadas.</TextoNegrito> */}
            </ScrollView>
        </LinearGradientMoots>
    )
}