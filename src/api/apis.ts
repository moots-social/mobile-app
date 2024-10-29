import axios from "axios";
//192.168.209.1
export const usuarioApi = axios.create({
    baseURL: "http://192.168.15.8:8080/user",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json" // Adicionando Content-Type
    }
});

export const usuarioLogin = axios.create({
    baseURL: "http://192.168.15.8:8080/login",
    headers: {
        Accept: "application/json", // Corrigido de "aplication/json"
        "Content-Type": "application/json" // Adicionando Content-Type
    }
});
