import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import { useUsuarioContext } from "../../context/UsuarioContext";

export default function PerfilOutroUsuario({navigation, route}){
    const {outroUsuario} = route.params
    const {usuario} = useUsuarioContext()

    useEffect(()=>{
        if(outroUsuario.id==usuario.id){
            navigation.goBack()
        }
    }, [route.params])

    return  <LinearGradientMoots>
                <PerfilBox objetoARenderizar={outroUsuario} seguir={true}/>
            </LinearGradientMoots>
    
}