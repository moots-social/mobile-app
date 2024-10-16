import { Box, Text } from "@gluestack-ui/themed";
import { LinearGreenGradientMoots } from "./LinearGradientMoots";
import { FullRounded } from "./Rounded";
import { TextoNegrito } from "./Texto";

export default function AlertaRegular({children}: any){
    return(
        <FullRounded minH={65} w={380} bg="$white" p={20} flexDirection="row" justifyContent="space-between">
            <Text fontFamily="Poppins_700Bold" fontSize={14} color="$black">
                {children}
            </Text>
            <Text justifyContent="flex-end" fontSize={16} brw={1} position="absolute" >
                X
            </Text>
        </FullRounded>
    )
}