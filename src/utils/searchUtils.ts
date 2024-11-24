import { apis } from "../api/apis"
import geralUtils from "./geralUtils"

export const buscarUsuario = async (query: string) =>{
    try {
        const resultado = await apis.search.buscarUsuario(query)
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}
export const buscarUsuarioPorCurso = async (curso: string) =>{
    try {
        const resultado = await apis.search.buscarUsuarioPorCurso(curso)
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return 0
    }
}
export const buscarUsuarioPorCursoEQuery = async (curso: string, query: string) =>{
    try {
        const resultado = await apis.search.buscarUsuarioPorCursoEQuery(curso, query)
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}
export const buscarPost = async (query: string) =>{
    try {
        const resultado = await apis.search.buscarPost(query)
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}
export const buscarPostPorUserId = async (id: number) =>{
    try {
        const resultado = await apis.search.buscarPostPorUserId(id)
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}
export const buscarTodosOsPosts = async () =>{
    try {
        const resultado = await apis.search.buscarTodosOsPosts()
        return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return 0
    }
}


export default {
    buscarUsuario,
    buscarUsuarioPorCurso,
    buscarUsuarioPorCursoEQuery,
    buscarPost,
    buscarPostPorUserId,
    buscarTodosOsPosts,
}