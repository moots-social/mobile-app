import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import { useUsuarioContext } from "../../context/UsuarioContext";

export default function PerfilOutroUsuario({navigation, route}){
    const {userId} = route.params
    const {usuario} = useUsuarioContext()

    useEffect(()=>{
        if(outroUsuario.userId==usuario.id){
            navigation.navigate('perfil')
        }
    }, [route.params])

    return  <LinearGradientMoots>
                <PerfilBox objetoARenderizar={outroUsuario} seguir={true}/>
            </LinearGradientMoots>
    
}