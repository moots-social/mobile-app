import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";
import Cadastro from "../screen/login/Cadastro";
import Contatos from "../screen/contatos/Contatos";
import Chat from "../screen/chat/Chat";
import Info from "../screen/login/Info";
import Bottom from "./bottom.routes";
import EditarPerfil from "../screen/editarPerfil/EditarPerfil";
import RedefinirSenha from "../screen/editarPerfil/RedefinirSenha";
import ExcluirConta from "../screen/editarPerfil/ExcluirConta";

const { Screen, Navigator } = createStackNavigator();
export default function Stack() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{headerShown: false}}/>
      <Screen name="cadastro" component={Cadastro} options={{headerShown: false}}/>
      <Screen name="tabs" component={Bottom} options={{ headerShown: false }}/>
      <Screen name="chat" component={Chat} options={{headerShown: false}}/>
      <Screen name="contatos" component={Contatos} options={{headerShown: false}}/>
      <Screen name="info" component={Info} options={{headerShown: false}}/>
      <Screen name="editar" component={EditarPerfil} options={{headerShown: false}}/>
      <Screen name="redefinir" component={RedefinirSenha} options={{headerShown: false}}/>
      <Screen name="excluir" component={ExcluirConta} options={{headerShown: false}}/>
    </Navigator>
  );
}
