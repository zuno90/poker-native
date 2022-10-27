import "expo-dev-client"
import * as ScreenOrientation from "expo-screen-orientation"
import { NativeBaseProvider } from "native-base"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthProvider } from "./src/context/AuthContext"
import Protected from "./src/components/Protected"
import { useEffect } from "react"

// const Stack = createNativeStackNavigator()

const App: React.FC = () => {
    // async function changeScreenOrientation() {
    //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
    // }
    // useEffect(() => {
    //     changeScreenOrientation()
    // }, [])
    return (
        <NativeBaseProvider>
            {/* <StatusBar /> */}
            <AuthProvider>
                <NavigationContainer>
                    {/* <Stack.Navigator>
                        <Stack.Screen name="SIGN IN" component={Signin} />
                        <Stack.Screen name="SIGN UP" component={Signup} />
                        <Stack.Screen name="HOME" component={Home} />
                    </Stack.Navigator> */}
                    <Protected />
                </NavigationContainer>
            </AuthProvider>
        </NativeBaseProvider>
    )
}

export default App
