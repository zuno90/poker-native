import "expo-dev-client";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import Protected from "./src/components/Protected";
import { Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import GameContextProvider from "./src/context/GameContext";
import rootReducer from "./src/app/config/redux/rootReducer";
import { store } from "./src/app/config/redux/configRedux";
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
      <Provider store={store}>
        <AuthProvider>
          <GameContextProvider>
            <NavigationContainer>
              <StatusBar hidden />
              <Protected />
            </NavigationContainer>
          </GameContextProvider>
        </AuthProvider>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
