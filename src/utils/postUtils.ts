import  * as Storage from "./storageUtils"
import * as Service from '../api/apis'
import { handleUpdateImage } from "../screen/editarPerfil/EditarPerfilScreen"


export const enviarNovoPost = async(texto?: string, listImagens?: string[])=>{
    let novasImagens: string[] = []
    const token = await Storage.getTokenStorage()

    try{
        if(listImagens && listImagens.length>0){
            novasImagens = await Promise.all(listImagens.map(async(listImagem)=>{
                return await handleUpdateImage(listImagem)
            }))
        }
        const resultado = await Service.postApi.post(`/criar`, {
            texto: texto || "", listImagens: novasImagens
        }, {
            headers:
            {
                Authorization: token
            }
        })
        if(resultado.data) return resultado.data
        else throw new Error()
    }catch(error: any){
        return error.response?.data?.error
    }
}

export const buscarTodosPosts = async()=>{
    const token = await Storage.getTokenStorage()

    try {
        const resultado = await Service.postApi.get(`/find-all`, {
            headers : { Authorization: token }
        })
        if(resultado.data) return resultado.data
        else throw new Error()
    } catch (error: any) {
        alert(error.response.data.error)
        return error.response?.data?.error
    }
}