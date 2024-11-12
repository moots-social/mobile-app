import { createSlice, configureStore } from "@reduxjs/toolkit";

const usuarioSlice = createSlice({
  name: "usuario", 
  initialState: {
    user: {} 
  },
  reducers: {
    setarUsuario: (state, action) => {
      state.user = action.payload; 
    }
  }
});

export const { setarUsuario } = usuarioSlice.actions;

// export const storeUsuario = configureStore({
//   reducer: usuarioSlice.reducer  
// });

export default usuarioSlice.reducer;
