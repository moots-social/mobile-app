import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import { useUsuarioContext } from "../../context/UsuarioContext";
import {  ScrollView,} from "@gluestack-ui/themed";

export default function PerfilOutroUsuario({navigation, route}){
    // const { userId } = route.params;  // Aqui você acessa o userId
    const {outroUsuario} = route.params
    const {usuario} = useUsuarioContext()
    useEffect(()=>{
        if(outroUsuario.userId==usuario.id){
            navigation.navigate('perfil')
        }
    }, [route.params])

    return  <LinearGradientMoots>
                <ScrollView>
                    <PerfilBox objetoARenderizar={outroUsuario} seguir={true}/>
                </ScrollView>
            </LinearGradientMoots>

}