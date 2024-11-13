import { apis } from "../api/apis"
import { blobUsuario } from "./usuarioUtils"


export const enviarNovoPost = async(texto?: string, listImagens?: string[])=>{
    let novasImagens: string[] = []
    let novoTexto: string = texto ? texto : ''
    try{
        if(listImagens && listImagens.length>0){
            novasImagens = await Promise.all(listImagens.map(async(listImagem)=>{
                return await blobUsuario(listImagem)
            }))
        }
        const resultado = await apis.post.novoPost(novoTexto, novasImagens)
        if(resultado.data) return resultado.data
    }catch(error: any){
        console.error(error)
        return error.response?.status
    }
}
