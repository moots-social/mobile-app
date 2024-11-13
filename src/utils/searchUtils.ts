import { apis } from "../api/apis"

const buscarUsuario = async (query: string) =>{
    try {
        const resultado = await apis.search.buscarUsuario(query)
        return resultado.data
    } catch (error) {
        console.error(error)
    }
}
const buscarUsuarioPorCurso = async (curso: string) =>{
    try {
        const resultado = await apis.search.buscarUsuarioPorCurso(curso)
        return resultado.data
    } catch (error) {
        console.error(error)
    }
}
const buscarUsuarioPorCursoEQuery = async (curso: string, query: string) =>{
    try {
        const resultado = await apis.search.buscarUsuarioPorCursoEQuery(curso, query)
        return resultado.data
    } catch (error) {
        console.error(error)
    }
}
const buscarPost = async (query: string) =>{
    try {
        const resultado = await apis.search.buscarPost(query)
        return resultado.data
    } catch (error) {
        console.error(error)
    }
}
const buscarPostPorUserId = async (id: number) =>{
    try {
        const resultado = await apis.search.buscarPostPorUserId(id)
        return resultado.data
    } catch (error) {
        console.error(error)
    }
}
const buscarTodosOsPosts = async () =>{
    try {
        const resultado = await apis.search.buscarTodosOsPosts()
        return resultado.data
    } catch (error) {
        console.error(error)
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