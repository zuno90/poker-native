import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { Image, View } from "native-base";
export default function StartScreen({ navigation }: any) {
  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
  return (
    <ImageBackground
      source={require("../../assets/BackgroundGame.png")}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          // position: "absolute",
          flexDirection: "column",
          // left: 100,
          zIndex: 2,
          backgroundColor: "transparent",
          justifyContent: "space-evenly",
          alignItems: "center",
          // top: -100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SIGNIN");
          }}
        >
          <Image
            alt="Alternate Text"
            source={require("../../assets/LoginButton.png")}
            style={{ width: 280, height: 78, top: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SIGNUP");
          }}
        >
          <Image
            source={require("../../assets/SignupButton.png")}
            alt="Alternate Text"
            style={{ width: 280, height: 72, top: 20 }}
          />
        </TouchableOpacity>
        {/*  
        <button
          onClick={() => navigation.navigate("SignUpScreens")}
          style={{ backgroundColor: "transparent", borderWidth: "0", position: "absolute" }}
        >
          <Image source={require("../assets/images/SignupButtona.png")} style={{ width: 262, height: 68 }}></Image>
        </button> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
