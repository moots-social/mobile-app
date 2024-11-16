import { apis } from "../api/apis"
import geralUtils from "./geralUtils"
import { getIdStorage } from "./storageUtils"

export const buscarNotificacoes = async()=>{
    try {
        const id = await getIdStorage()
        const resultado = await apis.notificacao.buscarNotificacoes(Number(id))
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'buscarNotificacoes', 'notificacaoUtils', error.response?.status || false)
        return error.response.status
    }
}
export const excluirNotificacao = async(notificacaoId: string)=>{
    try {
        await apis.notificacao.excluirNotificacao(notificacaoId)
        return 200
    } catch (error: any) {
        geralUtils.erro(error, 'excluirNotificacao', 'notificacaoUtils', error.response?.status || false)
        return error.response.status
    }
}

export default {buscarNotificacoes, excluirNotificacao}