import  * as Storage from "./storageUtils"
import * as Service from '../api/apis'
import { handleUpdateImage } from "../screen/editarPerfil/EditarPerfilScreen"

export const enviarNovoPost = async(texto?: string, listImagens?: string[])=>{
    const imagens: string[] = []
    try{
        const token = await Storage.getTokenStorage()
        // if(listImagens && listImagens.length>0){
        //     listImagens.map((listImagem)=>{
        //         handleUpdateImage(listImagem).then((res)=>imagens.push(res))
        //     })
        // }
        const resultado = await Service.postApi.post(`/criar`, {
            texto: texto, listImagens: imagens
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