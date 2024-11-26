import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/cabecalho/CabecalhoPerfil";
import { TextoNegrito } from "../../components/geral/Texto";
import { useState } from "react";
import { Alert } from "react-native";
import Loading from "../../components/geral/Loading";
import { logoutUser } from "../../utils/storageUtils";
import { useDispatch, } from "react-redux";
import { excluirConta } from "../../utils/usuarioUtils";
import { setarUsuario } from "../../redux/useUsuario";

export default function ExcluirConta(){
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleExcluirConta = async()=>{
        await excluirConta()

        Alert.alert('Conta excluída', 'Conta excluída com sucesso. Muito obrigado por ter feito parte do Moots!')
        setIsLoading(true)
        
        setTimeout(async()=>{
            await logoutUser()
            setIsLoading(false)
        }, 1000)
        
        dispatch(setarUsuario({}))
    }

    const handleSubmit = ()=>{
        try{
            Alert.alert('Excluir conta', 'Tem certeza que deseja excluir sua conta?', [
                {
                    text: 'Sim',
                    onPress: () => handleExcluirConta(),
                    style : 'default'
                },
                {
                    text: 'Não',
                    style: 'cancel'
                }
            ], )
        }catch(error){

        }
    }
    return(
        <Box w="100%" bg="$white" h="100%">
            <Loading isOpen={isLoading}/>
            <CabecalhoPerfil titulo='Excluir conta' />
            <Box w="100%" bg="$white" h="85%" justifyContent="space-between" alignItems="center">
                <Box w="90%" alignItems="center" mt={20} >
                    <TextoNegrito textAlign="center">Se você excluir sua conta, seu email ficará livre para a criação de outra conta. Além disso, você perderá suas publicações salvas, informações do perfil e suas conversas.</TextoNegrito>
                    <TextoNegrito mt={35}>Essa ação não pode ser revertida.</TextoNegrito>
                </Box>
                <Pressable justifyContent="flex-end" alignItems="center" onPress={handleSubmit}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Excluir conta</Text>
                </Pressable>
            </Box>
        </Box>
    )
}