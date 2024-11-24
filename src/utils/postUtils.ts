import { apis } from "../api/apis"
import { buscarDenunciasPorPostId, excluirDenuncia } from "./denunciaUtils"
import geralUtils from "./geralUtils"
import { getIdStorage } from "./storageUtils"
import { blobUsuario } from "./usuarioUtils"

export const buscarPostPorId = async(postId: number) =>{
    try {
        const resultado = await apis.post.buscarPostPorId(postId)
        return resultado.data
    } catch (error) {
        geralUtils.erro(error, 'buscarPostPorId', 'postUtils', error.response.status)
        return 0
    }
}

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

export const excluirPost = async(postId: number)=>{
    try {
        const denunciasNoPost = await buscarDenunciasPorPostId(postId)
        if(denunciasNoPost && denunciasNoPost.length>0){
            denunciasNoPost.map(async(denuncia: any)=>await excluirDenuncia(denuncia.id, postId))
        }
        await apis.post.excluirPost(postId)
    } catch (error) {
        geralUtils.erro(error, 'excluirPost', 'postUtils', error.response.status)
        return 0
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

export const excluirComentario = async(comentarioId: number, postId: number)=>{
    try {
        const req = await apis.post.excluirComentario(comentarioId, postId)
        return req.data
    } catch (error) {
        geralUtils.erro(error, 'excluirComentario', 'postUtils', error.response.status)
        return error.response.status || 0
    }
}
export const curtirPost = async(postId: number, likeStatus: boolean) =>{
    try {
        const dados = await apis.post.curtirPost(postId, likeStatus);
        const req = await dados.data;
        return req
    } catch (error) {
        geralUtils.erro(error, 'curtirPost', 'postUtils', error.response.status)
        return 0
    }
}
export const salvarPost = async(postId: number) =>{
    try {
        await apis.post.salvarPost(postId)
        return 200
    } catch (error) {
        geralUtils.erro(error, 'salvarPost', 'postUtils', error.response.status)
        return 0
    }
}
export const removerPostSalvo = async(postId: number) =>{
    try {
        const id = await getIdStorage()
        await apis.post.dessalvarPost(Number(id), postId)
        return 200
    } catch (error) {
        geralUtils.erro(error, 'removerPostSalvo', 'postUtils', error.response.status)
        return 0
    }
}
export default {
    enviarNovoPost, denunciarPost, buscarPostPorId, excluirComentario, curtirPost, salvarPost, removerPostSalvo
}

//renderização de posts em virtualizedlists
// export const getCountPosts = (_dados: any[]): number => {
//     return _dados.length
// }