import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import { useUsuarioContext } from "../../context/UsuarioContext";
import { Box, Text } from "@gluestack-ui/themed";

export default function PerfilOutroUsuario({navigation, route}){
    const { userId } = route.params;  // Aqui você acessa o userId
    
    // const {usuario} = useUsuarioContext()
    // useEffect(()=>{
    //     if(outroUsuario.userId==usuario.id){
    //         navigation.navigate('perfil')
    //     }
    // }, [route.params])

    // return  <LinearGradientMoots>
    //             <PerfilBox objetoARenderizar={outroUsuario} seguir={true}/>
    //         </LinearGradientMoots>

    return (
        <Box>
            <Text>Olá: {userId}</Text>
        </Box>
    )
    
}