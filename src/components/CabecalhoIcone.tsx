import { Image } from "@gluestack-ui/themed";
import { LinearGreenGradientMoots } from "./LinearGradientMoots";
import { RoundedBottom } from "./Rounded";

const image = require("../assets/vectorizedGreenAttempt.png");

export default function CabecalhoIcone(){
    return(
        <RoundedBottom h={80}>
            <LinearGreenGradientMoots justifyContent="center" alignItems="center" w="100%" h="100%">
                <Image source={image} w={40} h={40}/>
            </LinearGreenGradientMoots>
        </RoundedBottom >
    )
}