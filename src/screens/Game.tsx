import React from "react";
import { Image, Text, View } from "react-native";

export const Game = () => {
  return (
    <View>
      <Image
        resizeMode="contain"
        source={require("../../assets/BackgroundRoom.png")}
        style={{ width: "101%", height: "101%" }}
      />
    </View>
  );
};
