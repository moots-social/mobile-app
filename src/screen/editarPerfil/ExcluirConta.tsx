import { Box, Pressable, Text } from "@gluestack-ui/themed";
import CabecalhoPerfil from "../../components/CabecalhoPerfil.tsx";
import { TextoNegrito } from "../../components/Texto";
import { AlertDialogBranco } from "../../components/AlertDialogMoots";
import { useState } from "react";

export default function ExcluirConta(){
    const [confirmarExcluirIsOpen, setConfirmarExcluirIsOpen] = useState<boolean>(false)
    return(
        <Box w="100%" bg="$white" h="100%">
            <CabecalhoPerfil titulo='Excluir conta' />
            <Box w="100%" bg="$white" h="85%" justifyContent="space-between" alignItems="center">
                <Box w="90%" alignItems="center" mt={20} >
                    <TextoNegrito textAlign="center">Se você excluir sua conta, seu email ficará livre para a criação de outra conta. Além disso, você perderá suas publicações salvas, informações do perfil e suas conversas.</TextoNegrito>
                    <TextoNegrito mt={35}>Essa ação não pode ser revertida.</TextoNegrito>
                </Box>
                <Pressable justifyContent="flex-end" alignItems="center" onPress={()=>setConfirmarExcluirIsOpen(true)}>
                    <Text fontFamily="Poppins_600SemiBold" fontSize={24} color="#FF2626">Excluir conta</Text>
                    <AlertDialogBranco titulo="Confirmar ação" isOpen={confirmarExcluirIsOpen} onClose={()=>setConfirmarExcluirIsOpen(false)} >
                        Tem certeza que deseja excluir sua conta? 
                    </AlertDialogBranco>
                </Pressable>
            </Box>
        </Box>
    )
}