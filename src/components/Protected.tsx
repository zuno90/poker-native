import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "../context/AuthContext"
import Signin from "../screens/Signin"
import Signup from "../screens/Signup"
import Home from "../screens/Home"
import Room from "../screens/Room"
import StartScreen from "../screens/StartScreen"

const Stack = createNativeStackNavigator()

const Protected: React.FC = () => {
    const { authState } = useAuth()
    console.log(authState)
    return (
        <Stack.Navigator>
            {!authState.isAuth ? (
                <>
                    <Stack.Screen name="ROOT" component={StartScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SIGN IN" component={Signin} options={{ headerShown: false }} />
                    <Stack.Screen name="SIGN UP" component={Signup} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="HOME" component={Home} />
                    <Stack.Screen name="ROOM" component={Room} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default Protected
