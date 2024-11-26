import axios from "axios";
import {BASE_URL} from '@env'

import { getTokenStorage, logoutUser } from "../utils/storageUtils"
const baseURL = BASE_URL

const apiSemToken = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
})

//adiciona automaticamente o token na requisição
api.interceptors.request.use(async(config) => {
    const token = await getTokenStorage()
    if (token) {
      config.headers.Authorization = token
    }
    return config;
})

//se o token estiver inválido, vai fazer com que o usuário saia de sua conta
api.interceptors.response.use(response => response, async error => {
    if (error.response && error.response.status === 401) {
        alert('Sua sessão expirou. Faça login novamente.')
        await logoutUser()
    }else if (!error.response) {
        alert('Erro de rede.')
    }
     else {
        return Promise.reject(error)
    }
})

//cada requisição se torna um método que retorna o tipo Promise<AxiosResponse<any, any>>
//usar somente dentro de um arquivo da pasta /utils, exemplo: const resultado = await reqSemToken.login('teste@teste.com', 'senha')
export const reqSemToken = {
    login: (email: string, senha: string) => apiSemToken.post(`/login`, {email, senha}),
    cadastro: (usuario: any) => apiSemToken.post(`/user/criar`, 
        {nomeCompleto: usuario.nomeCompleto, email: usuario.email, senha: usuario.senha, tag: usuario.tag, roles: ["USER"], fotoPerfil: usuario.fotoPerfil,
            curso: usuario.curso, fotoCapa: '', descricao: '' 
        }), 
    buscarPerfil: (id: number) => apiSemToken.get(`/user/buscar/perfil/${id}`),
    blob: (formData: FormData) => apiSemToken.post(`/user/images`, formData, {params: {
        containerName: 'artifact-image-container'
    },
    headers: {
        'Content-Type': 'multipart/form-data',
    }}, ),
    buscarEmail: (email: string) => apiSemToken.get(`/user/buscarEmail`, {params: {email: email}}),
}

export const usuarioApi = {
    buscar: (id: number) => api.get(`/user/buscar/${id}`),
    buscarQuemSegue: (id: number) => api.get(`/user/buscar-quem-segue/${id}`),
    buscarSeguidores: (id: number) => api.get(`/user/buscar-seguidores/${id}`),
    buscarColecao: (id: number) => api.get(`/user/colecao-salvos/${id}`),
    atualizar: (id: number, usuario: any) =>{
        const {nomeCompleto, descricao, curso, fotoPerfil, fotoCapa} = usuario
        const resultado = api.put(`/user/atualizar/${id}`, {nomeCompleto, descricao, curso, fotoPerfil, fotoCapa})
        return resultado
    },
    seguir: (id1: number, id2: number, follow: boolean = true) => api.put(`/user/seguir`, {}, {params: {id1, id2, follow: follow}}),
    excluirConta: (id: number)=> api.delete(`/user/${id}`),
    redefinirSenha: (id: number, senhaAntiga: string, senhaNova: string)=> api.patch(`/user/redefinir-senha/${id}`, {
        senhaAntiga, senhaNova
    }),
}


export const searchApi = {
    buscarUsuario: (query: string) => api.get(`/search/user`, {params: {query: query}}),
    buscarUsuarioPorCurso: (curso: string) => api.get(`/search/user/curso/${curso}`),
    buscarUsuarioPorCursoEQuery: (curso: string, query: string) => api.get(`/search/user/curso/${curso}/query/${query}`),
    buscarPost: (query: string) => api.get(`/search/post`, {params: {query: query}}),
    buscarPostPorUserId: (id: number) => api.get(`/search/post/${id}`),
    buscarTodosOsPosts: () => api.get('/search/post/all'),
}

export const postApi = {
    buscarPostPorId: (postId: number) => api.get(`/post/${postId}`),
    novoPost: (texto: string, listImagens: string[]) => api.post(`/post/criar`, {texto: texto, listImagens: listImagens}),
    curtirPost: (postId: number, like: boolean) => api.put('/post/dar-like', {}, {params: {postId: postId, like: like}}),
    excluirPost: (postId: number) => api.delete(`/post/deletar/${postId}`),
    salvarPost: (postId: number) => api.post('/post/salvar-post-colecao', {}, {params: {postId: postId}}),
    dessalvarPost: (userId: number, postId: number) => api.delete(`/user/${userId}/post/${postId}`),
    criarReport: (postId: number, denuncia: string) => api.post(`/post/criar-report`, {
        postId, denuncia, contadorDenuncia: 0
    }),
    excluirComentario: (comentarioId: number, postId: number) => api.delete(`/comentario/deletar/${comentarioId}/post/${postId}`)
}

export const comentarioApi = {
    novoComentario: (postId: number, texto: string) => api.post(`/comentario/criar/${postId}`, {texto: texto}),
    excluirComentari: (comentarioId: number, postId: number) => api.delete(`/comentario/deletar/${comentarioId}/post/${postId}`)
}

export const notificacaoApi = {
    buscarNotificacoes: (id: number) => api.get(`/notification/${id}`),
    excluirNotificacao: (notificacaoId: string) => api.delete(`/notification/deletar-notificacao/${notificacaoId}`)
}

export const denunciaApi = {
    buscarTodasAsDenuncias: () => api.get(`/report`),
    buscarDenunciaPorId: (id: string) => api.get(`/report/${id}`),
    buscarDenunciasPorPostId: (postId: number) => api.get(`/report/post/${postId}`),
    excluirDenuncia: (id: string, postId: number) => api.delete(`/report/deletar/${id}/post/${postId}`)
}

export const apis = {
    semToken: reqSemToken,
    usuario: usuarioApi,
    search: searchApi,
    post: postApi,
    comentario: comentarioApi,
    notificacao: notificacaoApi,
    denuncia: denunciaApi
}