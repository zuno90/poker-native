import { Alert, TouchableOpacity, Image, Text } from "react-native";
import React from "react";

export const Action = ({ action, ImageAction, title }: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // Alert.alert("hello");
        action();
      }}
      style={{
        marginTop: "6%",
        zIndex: 9,
        display: "flex",
        alignItems: "center"
      }}
    >
      <Image
        resizeMode="cover"
        source={ImageAction}
        style={{
          width: 30,
          height: 30
        }}
      />
      <Text style={{ color: "white" }}>{title || "None"}</Text>
    </TouchableOpacity>
  );
};
