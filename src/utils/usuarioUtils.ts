import * as Service from "../api/apis";
import * as Storage from "./storageUtils";

export const login = async(email: string, senha: string) =>{
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
        return 'Autenticado com sucesso.'
    } catch (error: any) {
      return error.response.data.error
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

export const pararDeSeguir = async(nomeCompleto: string, id1: number, id2:number)=>{
    try {
        const token = await Storage.getTokenStorage()
        const resultado = await Service.usuarioApi.put(`/seguir`, {}, {
            params: {
                id1: id1,
                id2: id2,
                follow: false
            },
            headers: {
                Authorization: token
            }
        })
        if(resultado.data){
            return `Você parou de seguir ${nomeCompleto}.`
        }
    } catch (error: any) {
        return error.response?.data?.error
    }
}

export const seguirUsuario = async(nomeCompleto: string, id1: number, id2: number)=>{
    try {
        const token = await Storage.getTokenStorage()
        const resultado = await Service.usuarioApi.put(`/seguir`, {}, {
            params:{
                id1: id1,
                id2: id2
            },
            headers: {
                Authorization: token
            }
        })
        if(resultado){
            return `Agora você está seguindo ${nomeCompleto}.`
        } 
    } catch (error: any) {
        return error.response?.data?.error
    }
}

export const buscarQuemSegue = async()=>{
    try {
        const token = await Storage.getTokenStorage()
        const id = await Storage.getIdStorage()
        const resultado = await Service.usuarioApi.get(`/buscar-quem-segue/${id}`, {
            headers: { Authorization: token },
        });

        if (resultado.data) return resultado.data
    } catch (error: any) {
        return []
    }
}
export const buscarSeguidores = async()=>{
    try {
        const token = await Storage.getTokenStorage()
        const id = await Storage.getIdStorage()
        const resultado = await Service.usuarioApi.get(`/buscar-seguidores/${id}`, {
            headers: { Authorization: token },
        });

        if (resultado.data) return resultado.data
    } catch (error: any) {
        return []
    }
}