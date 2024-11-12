import { createSlice, configureStore } from "@reduxjs/toolkit";

const autenticacaoSlice = createSlice({
    name: "auth",
    initialState: {
        autenticado: false
    },
    reducers: {
        autenticar: state => {
            state.autenticado = true
        },
        desautenticar: state => {
            state.autenticado = false
        }
    }
})

export const { autenticar, desautenticar } = autenticacaoSlice.actions

// export const storeAutenticacao = configureStore({
//     reducer: autenticacaoSlice.reducer
// })

export default autenticacaoSlice.reducer 