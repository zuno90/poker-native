import "expo-dev-client";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import Protected from "./src/components/Protected";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

const App: React.FC = () => {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }
  useEffect(() => {
    changeScreenOrientation();
  }, []);

  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar hidden />
          <Protected />
        </NavigationContainer>
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
