import { Box, Image, Input, InputField, Pressable, ScrollView, Text } from "@gluestack-ui/themed";
import LinearGradientMoots from "../../components/LinearGradientMoots";
import CabecalhoPerfil from "../../components/CabecalhoPerfil";
import { TextoNegrito } from "../../components/Texto";
import InputPerfil, { MultiLinhaInputPerfil } from "../../components/InputPerfil";
import { useNavigation } from "@react-navigation/native";

const UsuarioIcon = require('../../assets/UsuarioIcon.png')

export default function EditarPerfil({fotoPerfil}){
    const navigation = useNavigation()

    return(
        <LinearGradientMoots>
            <CabecalhoPerfil titulo="Editar perfil"/>
                <ScrollView w="100%" bg="$white" bottom={5} h="100%">
                    <Box alignItems="center" my={20}>
                        <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Perfil</Text>
                        <Image source={fotoPerfil ? fotoPerfil : UsuarioIcon}/>
                        <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Alterar foto de perfil ou capa</TextoNegrito>
                    </Box>
                    <Box alignItems="center">
                            <InputPerfil titulo="Nome de exibição" w="90%"/>
                            <Box w="100%" mt={20}>
                                <MultiLinhaInputPerfil titulo="Descrição" w="90%"/>
                            </Box>
                    </Box>
                    <Box alignItems="center" my={20}>
                        <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="$black">Avançado</Text>
                            <Pressable alignItems="center" onPress={()=>navigation.navigate('redefinir')}>
                                <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Redefinir senha</TextoNegrito>
                            </Pressable>
                            <Pressable alignItems="center" onPress={()=>navigation.navigate('colecao')}>
                                <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Acessar sua coleção de posts</TextoNegrito>
                            </Pressable>
                            <Pressable alignItems="center" onPress={()=>navigation.navigate('excluir')}>
                                <TextoNegrito fontFamily="Poppins_600SemiBold" fontSize={16} color="$lightSete" mt={3}>Excluir conta</TextoNegrito>
                            </Pressable>
                    </Box>
                    <Pressable alignItems="center">
                        <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Sair</Text>
                    </Pressable>
                </ScrollView>
        </LinearGradientMoots>
    )
}