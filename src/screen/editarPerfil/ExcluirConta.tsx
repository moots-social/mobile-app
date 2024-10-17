import { Box, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";

export default function ExcluirConta(){
    return(
        <LinearGradientMoots>
            <CabecalhoPerfil titulo='Excluir conta' />
            <RoundedBottom w="100%" bg="$white" bottom={5} h={625} alignItems="center">
                <Box w="90%" alignItems="center" my={20} >
                    <TextoNegrito textAlign="center">Se você excluir sua conta, seu email ficará livre para a criação de outra conta. Além disso, você perderá suas publicações salvas, informações do perfil e suas conversas.</TextoNegrito>
                    <TextoNegrito mt={35}>Essa ação não pode ser revertida.</TextoNegrito>
                </Box>
                <Box justifyContent="flex-end" h="63%" py={35} alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Excluir conta</Text>
                </Box>
            </RoundedBottom>
        </LinearGradientMoots>
    )
}