import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";
import Cadastro from "../screen/login/Cadastro";
import Info from "../screen/login/Info";

const { Screen, Navigator } = createStackNavigator();
export default function Stack() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{headerShown: false}}/>
      <Screen name="cadastro" component={Cadastro} options={{headerShown: false}}/>
      <Screen name="info" component={Info} options={{headerShown: false}}/>
    </Navigator>
  );
}
