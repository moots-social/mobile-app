import { combineReducers, createStore } from "redux";
import useAutenticacao from "./useAutenticacao";
import useUsuario from "./useUsuario";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: useAutenticacao,
    usuario: useUsuario
})

export const store = configureStore({
    reducer: rootReducer
})

export default store