import { createSlice, configureStore } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
  name: "usuario", 
  initialState: {
    user: {},
    termos: [],
    filtros: {
      radioGeral: 'tudo',
      radioUsuario: 'qualquerUm',
      selectUsuario: 'Qualquer',
      checkPublicacoes: true,
    },
    notificacoes: []
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
    setarFiltros: (state, action) =>{
      return {
        ...state,
        filtros: {
          radioGeral: action.payload.radioGeral,
          radioUsuario: action.payload.radioUsuario,
          selectUsuario: action.payload.selectUsuario,
          checkPublicacoes: action.payload.checkPublicacoes
        }
      }
    },
    setarFiltrosPadrao: state => {
      return {
        ...state,
        filtros: {
          radioGeral: 'tudo',
          radioUsuario: 'qualquerUm',
          selectUsuario: 'Qualquer',
          checkPublicacoes: true,
        }
    }
  },
  setarNotificacoes: (state, action) =>{ 
    return {
      ...state,
      notificacoes: [...state.notificacoes, action.payload]
    }
  }
}});

export const { setarUsuario, novoTermo, novaListaTermo, setarFiltros, setarFiltrosPadrao, setarNotificacoes } = usuarioSlice.actions;

export default usuarioSlice.reducer;
