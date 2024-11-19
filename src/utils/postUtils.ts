import { apis } from "../api/apis"
import geralUtils from "./geralUtils"
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

export const denunciarPost = async(postId: number, denuncia: string)=>{
    try {
        const req = await apis.post.criarReport(postId, denuncia)
        if(req.data === 'Reporte realizado com sucesso') return 200
    } catch (error: any) {
        console.error(error.response.data.error)
        geralUtils.erro(error, 'denunciarPost', 'postUtils', error.response.status)
        return error.response.status || 0
    }
}

export default {
    enviarNovoPost, denunciarPost
}

//renderização de posts em virtualizedlists
// export const getCountPosts = (_dados: any[]): number => {
//     return _dados.length
// }