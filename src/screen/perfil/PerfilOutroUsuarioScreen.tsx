import { useEffect, useState } from "react";
import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";
import {  ScrollView,} from "@gluestack-ui/themed";
import { buscarSemToken } from "../../utils/usuarioUtils";
import { useSelector } from "react-redux";
import Loading from "../../components/geral/Loading";

export default function PerfilOutroUsuario({navigation, route}){
    const [usuarioARenderizar, setUsuarioARenderizar] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { userId } = route.params
    const usuario = useSelector((state: any) => state.usuario.user)

    useEffect(()=>{
        if(userId == usuario.id){
            navigation.navigate('perfil')
        } else {
            const buscarUsuario = async()=>{
                try {
                    const user = await buscarSemToken(userId)
                    setUsuarioARenderizar(user)
                } catch (error) {
                    console.error(error)
                    navigation.goBack()
                }
            }

            buscarUsuario()
            setIsLoading(false)
        }
    }, [route.params])

    if (!usuarioARenderizar) return <Loading isOpen={isLoading}/>
    else return <LinearGradientMoots>
                <ScrollView>
                    <PerfilBox objetoARenderizar={usuarioARenderizar} seguir={true}/>
                </ScrollView>
            </LinearGradientMoots>

}