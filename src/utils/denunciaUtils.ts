import { apis } from "../api/apis"
import geralUtils from "./geralUtils"

export const buscarDenuncias = async() =>{
    try {
        const req = await apis.denuncia.buscarTodasAsDenuncias()
        if(req.data && req.data.length>0) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarDenuncias', 'denunciaUtils', error.response.status)
        return []
    }
}
export const buscarDenunciaPorId = async(id: number) =>{
    try {
        const req = await apis.denuncia.buscarDenunciaPorId(id)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarTodasAsDenuncias', 'denunciaUtils', error.response.status)
        
    }
}
export const buscarDenunciasPorPostId = async(postId: number) =>{
    try {
        const req = await apis.denuncia.buscarDenunciasPorPostId(postId)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarTodasAsDenuncias', 'denunciaUtils', error.response.status)
        
    }
}
export const excluirDenuncia = async(id:number, postId: number) =>{
    try {
        const req = await apis.denuncia.excluirDenuncia(id, postId)
        if(req.data) return req.data
    } catch (error) {
        geralUtils.erro(error, 'buscarTodasAsDenuncias', 'denunciaUtils', error.response.status)
        
    }
}

export default {
    buscarDenuncias, buscarDenunciaPorId, buscarDenunciasPorPostId, excluirDenuncia
}