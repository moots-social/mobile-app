import axios from "axios";

//SERVIDOR: 172.16.3.228
//192.168.209.1
//172.16.2.183
//192.168.15.8

export const usuarioApi = axios.create({
    baseURL: "http://192.168.15.8:8080/user",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json" 
    }
});

export const usuarioLogin = axios.create({
    baseURL: "http://192.168.15.8:8080/login",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json" 
    }
});



export const searchApi = axios.create({
    baseURL: "http://192.168.15.8:8080/search", // ou /user ou /post
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export const postApi = axios.create({
    baseURL: "http://192.168.15.8:8080/post", // ou /user ou /post
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});