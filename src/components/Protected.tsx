import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Home from "../screens/Home";

import StartScreen from "../screens/StartScreen";
import Game from "../screens/game/Game";

const Stack = createNativeStackNavigator();

const Protected: React.FC = () => {
  const { authState } = useAuth();
  return (
    <Stack.Navigator>
      {!authState.isAuth ? (
        <>
          <Stack.Screen
            name="ROOT"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SIGN IN"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SIGN UP"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="GAME"
            component={Game}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HOME"
            component={Home}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Protected;
