import { apis } from "../api/apis";
import geralUtils from "./geralUtils";
import { storage } from "./storageUtils";

export const login = async(email: string, senha: string) =>{
    try {
        console.log('requisição feita')
        const dado = await apis.semToken.login(email, senha);
        const res = await dado.data;
        if(res){
            await storage.setTokenStorage(res.token)
            await storage.setAnyItemStorage('email', res.login)
            await storage.setAnyItemStorage('id', String(res.id))
            await storage.setAnyItemStorage('auth', String(true))
        }
        return 'Autenticado com sucesso.'
    } catch (error: any) {
        geralUtils.erro(error, 'login', 'usuarioUtils', error.response?.status || false)
        console.error(error.response?.data?.error)
        return 0
    }finally {
        console.log('requisição finalizada')
    }
}
export const criar = async(usuario: any)=>{
    try {
        const dado = await apis.semToken.cadastro(usuario)
        if(dado.data) return `Usuário "${dado.data.nomeCompleto}" criado com sucesso.`
    } catch (error: any) {
        geralUtils.erro(error, 'criar', 'usuarioUtils', error.response?.status || false)
        console.error(error.response?.data?.error)
        return 0
  }
}

export const buscarEmail = async(email: string)=>{
    try {
        const dado = await apis.semToken.buscarEmail(email);
        const res = await dado.data
        return res
    } catch (error: any) {
        geralUtils.erro(error, 'buscarEmail', 'usuarioUtils', error.response?.status || false)
        console.error(error.response?.data?.error)
        return error.response.status
    }
}
export const buscar = async()=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscar(Number(id))
        const res = resultado.data
        return res
    } catch (error: any) {
        geralUtils.erro(error, 'buscar', 'usuarioUtils', error.response?.status || false)
        console.error(error.response?.data?.error)
    }
}

export const pararDeSeguir = async(id1: number, id2:number)=>{
    try {
        const resultado = await apis.usuario.seguir(id1, id2, false)
        if(resultado.data) return 200
    } catch (error: any) {
        geralUtils.erro(error, 'pararDeSeguir', 'usuarioUtils', error.response?.status || false)
        console.log(error.response.details)
        return error.response.status
    }
}

export const seguirUsuario = async(id1: number, id2: number)=>{
    try {
        const resultado = await apis.usuario.seguir(id1, id2)
        if(resultado.data) return 200
    } catch (error: any) {
        geralUtils.erro(error, 'seguirUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}

export const atualizarDados = async(usuario: any)=>{
    try {
        const id = Number(await storage.getIdStorage())
        const resultado = await apis.usuario.atualizar(id, usuario)
        if(resultado.data) return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'atualizarDados', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}

export const buscarQuemSegue = async(userId?: number)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscarQuemSegue(userId || Number(id))
        if (resultado.data) return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'buscarQuemSegue', 'usuarioUtils', error.response?.status || false)
        console.warn('se status for igual a 409, ignorar')
        return []
    }
}
export const buscarSeguidores = async(userId?: number)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscarSeguidores(userId || Number(id))
        
        if (resultado.data) return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'buscarSeguidores', 'usuarioUtils', error.response?.status || false)
        console.warn('se status for igual a 409, ignorar')
        return []
    }
}

export const buscarSemToken = async (id: number) => {
    try{
        const resultado = await apis.semToken.buscarPerfil(id)
        if(resultado.data) return resultado.data
    }catch(error: any){
        geralUtils.erro(error, 'buscarSemToken', 'usuarioUtils', error.response?.status || false)
        console.error(error.response.data.error)
        return error.response.status
    }
}

export const excluirConta = async () => {
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.excluirConta(Number(id))
        if(resultado.data) return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'excluirConta', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}

export const blobUsuario= async(uri: string)=>{
    let novaPerfilURL = ''
    try {
        const formData = new FormData()
        formData.append('file', {
            uri: uri,
            name: 'perfil.jpeg',
            type: 'image/jpeg'
        })
        
        const dado = await apis.semToken.blob(formData);
        const req = await dado.data;
        
        if (req) {
            novaPerfilURL = req.data
        }
    } catch (error: any) {
        geralUtils.erro(error, 'blobUsuario', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
    return novaPerfilURL
}

export const redefinirSenha = async(senhaAntiga: string, senhaNova: string)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.redefinirSenha(Number(id), senhaAntiga, senhaNova)
        if(resultado.data) return resultado.data
    } catch (error: any) {
        geralUtils.erro(error, 'redefinirSenha', 'usuarioUtils', error.response?.status || false)
        return error.response.status
    }
}

export const buscarColecao = async()=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscarColecao(Number(id))
        return resultado.data
    } catch (error) {
        geralUtils.erro(error, 'buscarColecao', 'usuarioUtils', error.response?.status || false)
        return 0
    }
}

export default {
    login,
    criar,
    buscarEmail,
    buscar,
    pararDeSeguir,
    seguirUsuario,
    atualizarDados,
    buscarQuemSegue,
    buscarSeguidores,
    buscarSemToken,
    excluirConta,
    blobUsuario,
    redefinirSenha,
    buscarColecao
}