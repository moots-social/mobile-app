import { ScrollView } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import { FotoCapaBox } from "./PerfilBoxComponents";

export default function PerfilOutroUsuario(){
    return(
        <LinearGradientMoots>
            <ScrollView w="100%" display="flex">
                <FotoCapaBox fotoPerfilSource={''} fotoCapaSource={''} />
            </ScrollView>
        </LinearGradientMoots>
    )
}