import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import InputPerfil from "../../components/InputPerfil";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";

export default function RedefinirSenha({navigation}){
    return(
        <LinearGradientMoots>
            <CabecalhoPerfil navigation={navigation} voltarPara={'editar'} titulo='Redefinir senha' />
            <RoundedBottom w="100%" bg="$white" bottom={5} h={625} >
                <Box w="100%" alignItems="center" my={20} >
                    <InputPerfil type='password' titulo='Senha atual' w="90%"/>
                    <Box flexDirection="row" mt={5}>
                        <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
                        <Pressable>
                            <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
                        </Pressable>
                    </Box>
                </Box>
                <Box w="100%">
                    <InputPerfil type='password' titulo='Nova senha' w="90%"/>
                </Box>
                <Box w="100%" my={20} >
                    <InputPerfil type='password' titulo='Repita a nova senha' w="90%"/>
                </Box>
                {/* <Box justifyContent="flex-end" h="50%" py={35} alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$lightSete">Salvar alterações</Text>
                </Box> */}
            </RoundedBottom>
        </LinearGradientMoots>
    )
}