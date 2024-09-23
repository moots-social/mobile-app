import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";
import Cadastro from "../screen/login/Cadastro";
import Contatos from "../screen/contatos/Contatos";
import Chat from "../screen/chat/Chat";

const { Screen, Navigator } = createStackNavigator();
export default function Stack() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{headerShown: false}}/>
      <Screen name="cadastro" component={Cadastro} options={{headerShown: false}}/>
      <Screen name="contatos" component={Contatos} options={{headerShown: false}}/>
      <Screen name="chat" component={Chat} options={{headerShown: false}}/>
    </Navigator>
  );
}
