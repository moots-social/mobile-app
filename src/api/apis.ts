import axios from "axios";


export const usuarioApi = axios.create({
    baseURL: "http://localhost:8080/user",
    headers: {
        Accept: "application/json"
    }
})

export const usuarioLogin = axios.create({
    baseURL: "http://172.16.2.65:8080/login",
    headers: {
        Accept: "application/json" // Corrigido de "aplication/json"
    }
});

