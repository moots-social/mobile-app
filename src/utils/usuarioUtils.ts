import { apis } from "../api/apis";
import { storage } from "./storageUtils";

export const login = async(email: string, senha: string) =>{
    try {
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
      return error
  }
}
export const criar = async(usuario: any)=>{
    try {
        const dado = await apis.semToken.cadastro(usuario)
        if(dado.data) return `Usuário "${dado.data.nomeCompleto}" criado com sucesso.`
    } catch (error: any) {
        alert(error)
      console.error(error.response?.data?.error)
  }
}

export const buscarEmail = async(email: string)=>{
    try {
        const dado = await apis.semToken.buscarEmail(email);
        const res = await dado.data
        return res
    } catch (error: any) {
      return error.response.status
  }
}
export const buscar = async()=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscar(Number(id))
        const res = resultado.data
        if(res) return res
    } catch (error: any) {
        console.error(error.response?.data?.error)
    }
}

export const pararDeSeguir = async(id1: number, id2:number)=>{
    try {
        const resultado = await apis.usuario.seguir(id1, id2, false)
        if(resultado.data) return 200
    } catch (error: any) {
        return error.response.status
    }
}

export const seguirUsuario = async(id1: number, id2: number)=>{
    try {
        const resultado = await apis.usuario.seguir(id1, id2)
        if(resultado) return 200
    } catch (error: any) {
        return error.response.status
    }
}

export const atualizarDados = async(usuario: any)=>{
    try {
        const id = Number(await storage.getIdStorage())
        const resultado = await apis.usuario.atualizar(id, usuario)
        if(resultado.data) return resultado.data
    } catch (error) {
        console.error(error)
    }
}

export const buscarQuemSegue = async(userId?: number)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscarQuemSegue(userId || Number(id))
        if (resultado.data) return resultado.data
    } catch (error: any) {
        return []
    }
}
export const buscarSeguidores = async(userId?: number)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.buscarSeguidores(userId || Number(id))

        if (resultado.data) return resultado.data
    } catch (error: any) {
        return []
    }
}

export const buscarSemToken = async (id: number) => {
    try{
        const resultado = await apis.semToken.buscarPerfil(id)
        if(resultado.data) return resultado.data
    }catch(error){ console.error(error)}
}

export const excluirConta = async () => {
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.excluirConta(Number(id))
        if(resultado.data) return resultado.data
    } catch (error) {
        console.error(error)
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
        console.error(error.response.data.error)
    }
    return novaPerfilURL
}

export const redefinirSenha = async(senhaAntiga: string, senhaNova: string)=>{
    try {
        const id = await storage.getIdStorage()
        const resultado = await apis.usuario.redefinirSenha(Number(id), senhaAntiga, senhaNova)
        if(resultado.data) return resultado.data
    } catch (error) {
        console.error(error)
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
}