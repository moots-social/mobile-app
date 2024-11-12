import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import { useUsuarioContext } from "../../context/UsuarioContext";
import {  ScrollView,} from "@gluestack-ui/themed";
import { buscarSemToken } from "../../utils/usuarioUtils";

export default function PerfilOutroUsuario({navigation, route}){
    const [usuarioARenderizar, setUsuarioARenderizar] = useState()
    const { userId } = route.params // Aqui você acessa o userId
    let {outroUsuario} = route.params
    const {usuario} = useUsuarioContext()

    useEffect(()=>{
        if(outroUsuario.nomeCompleto == undefined || userId==usuario.id || userId === undefined){
            navigation.navigate('perfil')
        } else {
            const buscarUsuario = async()=>{
                try {
                    const usuario = await buscarSemToken(userId)
                    outroUsuario = usuario
                } catch (error) {
                    console.error(error)
                }
            }

            buscarUsuario()
        }
    }, [route.params])

    return  <LinearGradientMoots>
                <ScrollView>
                    <PerfilBox objetoARenderizar={outroUsuario} seguir={true}/>
                </ScrollView>
            </LinearGradientMoots>

}