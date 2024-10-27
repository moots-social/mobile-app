import AsyncStorage from "@react-native-async-storage/async-storage"

export const logoutUser = async(setAutentication: any, setUsuario: any): Promise<void> =>{
    await AsyncStorage.multiRemove(['token', 'id', 'email'])
    await AsyncStorage.setItem('autentication', String(false))
    setAutentication('false')
    setTimeout(()=>{
        setUsuario({curso: ''})
    }, 100)
}