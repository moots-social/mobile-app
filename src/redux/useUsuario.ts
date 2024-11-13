import { createSlice, configureStore } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
  name: "usuario", 
  initialState: {
    user: {},
    termos: [],
    filtros: {
      
    }
  },
  reducers: {
    setarUsuario: (state, action) => {
      return {
        ...state,
        user: action.payload
      }
    },
    novoTermo: (state, action) => {
      return {
        ...state,
        termos: [...state.termos, action.payload],
      };
    },
    novaListaTermo: (state, action) =>{
      state.termos = action.payload
    },
  }
});

export const { setarUsuario, novoTermo, novaListaTermo } = usuarioSlice.actions;

// export const storeUsuario = configureStore({
//   reducer: usuarioSlice.reducer  
// });

export default usuarioSlice.reducer;
