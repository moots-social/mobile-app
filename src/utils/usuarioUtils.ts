import { Alert } from "react-native";
import * as Service from "../api/apis";
import * as Storage from "./storageUtils";

export const login = async(email: string, senha: string): Promise<void> =>{
    try {
        const dado = await Service.usuarioLogin.post("", {
            email : email,
            senha : senha
        });
        const res = await dado.data;
        if(res){
            await Storage.setTokenStorage(res.token)
            await Storage.setAnyItemStorage('email', res.login)
            await Storage.setAnyItemStorage('id', String(res.id))
            await Storage.setAnyItemStorage('auth', String(true))
        }
    } catch (error: any) {
      Alert.alert('Erro', error.response.data.error)
  }
}

export const buscar = async()=>{
    try {
        const token = await Storage.getTokenStorage()
        const id = await Storage.getIdStorage()
        const resultado = await Service.usuarioApi.get(`/buscar/${id}`,{
            headers: {Authorization: token}
        })
        const res = resultado.data
        if(res) return res
    } catch (error: any) {
        return error.response?.data?.error
    }
}

