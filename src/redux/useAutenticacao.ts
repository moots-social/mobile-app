import { createSlice, configureStore } from "@reduxjs/toolkit";
import { logoutUser } from "../utils/storageUtils";

const autenticacaoSlice = createSlice({
    name: "auth",
    initialState: {
        autenticado: false
    },
    reducers: {
        autenticar: state => {
            return {
                ...state,
                autenticado: true
            }
        },
        desautenticar: (state) => {
            return {
                ...state,
                autenticado: false,
            }
        }
    }
})

export const { autenticar, desautenticar } = autenticacaoSlice.actions

// export const storeAutenticacao = configureStore({
//     reducer: autenticacaoSlice.reducer
// })

export default autenticacaoSlice.reducer 