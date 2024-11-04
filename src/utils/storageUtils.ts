import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

export const getTokenStorage = async()=>{
    try {
        const token: string | null = await AsyncStorage.getItem('token')
        return token
    } catch (error) {
        Alert.alert('Erro', `Nenhum token encontrado. ${String(error)}`)
    }
}

//serve apenas para a leitura dos itens no async storage
export const getAllItemsStorage = async()=>{
    try {
        const items: readonly string[] = await AsyncStorage.getAllKeys()
        return items
    } catch (error) {
        Alert.alert('Erro', `Algo deu errado. ${String(error)}`)
    }
}

export const getIdStorage = async()=>{
    try {
        const id: string | null = await AsyncStorage.getItem('id')
        return id
    } catch (error) {
        Alert.alert('Erro', `Algo deu errado. ${String(error)}`)
    }
}
export const getAnyItemStorage = async(item: string)=>{
    try {
        const novoItem: string | null = await AsyncStorage.getItem(item)
        return novoItem
    } catch (error) {
        Alert.alert('Erro', `Algo deu errado. ${String(error)}`)
    }
}

export const setTokenStorage = async(token: string)=>{
    try {
        const item=await AsyncStorage.setItem('token', token)
        return item
    } catch (error) {
        Alert.alert('Erro', `Algo deu errado. ${String(error)}`)
    }
}
export const setAnyItemStorage = async(item: string, value: any)=>{
    try {
        await AsyncStorage.setItem(item, value)
    } catch (error) {
        Alert.alert('Erro', `Algo deu errado. ${String(error)}`)
    }
}

export const logoutUser = async(setAuth: any, setUsuario: any): Promise<void> =>{
    await AsyncStorage.multiRemove(['token', 'id', 'email'])
    await AsyncStorage.setItem('auth', String(false))
    setAuth('false')
    setTimeout(()=>{
        setUsuario({curso: ''})
    }, 100)
}

// export const invalidToken = async(setAutentication: any, setUsuario: any)=>{
//     Alert.alert('Sessão expirada', 'Sua sessão expirou. Faça login novamente para continuar aproveitando.')
//     logoutUser(setAutentication, setUsuario)
// }