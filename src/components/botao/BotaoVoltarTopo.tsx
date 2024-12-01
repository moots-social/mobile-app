import { Pressable } from "@gluestack-ui/themed";
import { TextoNegrito } from "../geral/Texto";

export default function BotaoVoltarTopo({...rest}){
    return <Pressable bg='$lightQuatro' $active-bg='$lightTres' justifyContent='center' alignItems='center' p={10} rounded={30} {...rest}>
                <TextoNegrito color='$white'>Voltar ao topo</TextoNegrito>
            </Pressable>
}