import { apis } from "../api/apis"
import { blobUsuario } from "./usuarioUtils"


export const enviarNovoPost = async(texto: string, listImagens: string[])=>{
    let novasImagens: string[] = []
    let novoTexto: string = texto ? texto : ''
    try{
        if(listImagens && listImagens.length>0 && listImagens[0]!==''){
            novasImagens = await Promise.all(listImagens.map(async(listImagem)=>{
                return await blobUsuario(listImagem)
            }))
        }
        const resultado = await apis.post.novoPost(novoTexto, novasImagens)
        if(resultado.data) return {post: resultado.data, resultado: 'Post enviado com sucesso.'}
    }catch(error: any){
        return error.response?.status
    }
}
