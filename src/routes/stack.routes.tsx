import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";
import Cadastro from "../screen/login/Cadastro";

const { Screen, Navigator } = createStackNavigator();
export default function Stack() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{headerShown: false}}/>
      <Screen name="cadastro" component={Cadastro} options={{headerShown: false}}/>
    </Navigator>
  );
}
