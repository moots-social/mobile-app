import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";

const { Screen, Navigator } = createStackNavigator();
export default function Stack() {
  return (
    <Navigator>
      <Screen name="login" component={Login} options={{headerShown: false}}/>
    </Navigator>
  );
}
