import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import InputPerfil from "../../components/InputPerfil";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import { RoundedBottom } from "../../components/Rounded";
import { TextoNegrito } from "../../components/Texto";

export default function RedefinirSenha(){
    return(
        <Box bg="$white" h="100%">
            <CabecalhoPerfil titulo='Redefinir senha' />
            <Box justifyContent="space-between" h="85%">
                <Box>
                    <Box alignItems="center" my={20} >
                        <InputPerfil type='password' titulo='Senha atual' w="90%"/>
                        <Box flexDirection="row" mt={5}>
                            <TextoNegrito>Esqueceu sua senha? </TextoNegrito>
                            <Pressable>
                                <TextoNegrito color="$lightSete">Redefinir senha</TextoNegrito>
                            </Pressable>
                        </Box>
                    </Box>
                    <Box>
                        <InputPerfil type='password' titulo='Nova senha' w="90%"/>
                    </Box>
                    <Box my={20} >
                        <InputPerfil type='password' titulo='Repita a nova senha' w="90%"/>
                    </Box>
                </Box>
                <Box alignItems="center">
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$lightSete">Salvar alterações</Text>
                </Box>
            </Box>
        </Box>
    )
}