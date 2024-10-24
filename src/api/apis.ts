import axios from "axios";
//original = 172.16.1.198
//senai = 172.16.2.183
//192.168.15.8
export const usuarioApi = axios.create({
    baseURL: "http://172.16.2.183:8080/user",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // Adicionando Content-Type
    }
});

export const usuarioLogin = axios.create({
    baseURL: "http://172.16.2.183:8080/login",
    headers: {
        Accept: "application/json", // Corrigido de "aplication/json"
        "Content-Type": "application/json" // Adicionando Content-Type
    }
});
