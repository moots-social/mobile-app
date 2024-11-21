import { apis } from "../api/apis"
import geralUtils from "./geralUtils"

export const buscarDenuncias = async() =>{
    try {
        const req = await apis.denuncia.buscarTodasAsDenuncias()
        return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarDenuncias', 'denunciaUtils', error.response.status)
        return []
    }
}
export const buscarDenunciaPorId = async(id: string) =>{
    try {
        const req = await apis.denuncia.buscarDenunciaPorId(id)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarDenunciaPorId', 'denunciaUtils', error.response.status)
        return 0
    }
}
export const buscarDenunciasPorPostId = async(postId: number) =>{
    try {
        const req = await apis.denuncia.buscarDenunciasPorPostId(postId)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarDenunciasPorPostId', 'denunciaUtils', error.response.status)
        return 0
    }
}
export const excluirDenuncia = async(id:string, postId: number) =>{
    try {
        const req = await apis.denuncia.excluirDenuncia(id, postId)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'excluirDenuncia', 'denunciaUtils', error.response.status)
        return 0
    }
}

export default {
    buscarDenuncias, buscarDenunciaPorId, buscarDenunciasPorPostId, excluirDenuncia
}