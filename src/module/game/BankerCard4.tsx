import { Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";

export const BankerCard4 = ({ ImageBanker4 }) => {
  const [count, setCount] = useState(0);
  const { waveGame } = useSelector(selectGame);

  useEffect(() => {
    if (waveGame % 8 === 3) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(SizeCard4, {
            useNativeDriver: false,
            toValue: 85,
            duration: 100,
          }),
          Animated.timing(PositionVerticalCard4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 100,
          }),
          Animated.timing(PositionHorizontalCard4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 100,
          }),
        ]),
        Animated.parallel([
          Animated.timing(RotateCard4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(UnRotateCard4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(Opacity4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(UnOpacity4, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
        ]),
      ]).start();
    } else if (waveGame % 8 == 7) {
      Animated.parallel([
        Animated.timing(RotateCard4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(UnRotateCard4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(Opacity4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(UnOpacity4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(SizeCard4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(PositionVerticalCard4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(PositionHorizontalCard4, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
      ]).start();
    }
  }, [waveGame]);

  const RotateCard4 = useRef(new Animated.Value(0)).current;
  const UnRotateCard4 = useRef(new Animated.Value(0)).current;
  const Opacity4 = useRef(new Animated.Value(-1)).current;
  const UnOpacity4 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard4 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard4 = useRef(new Animated.Value(0)).current;
  const SizeCard4 = useRef(new Animated.Value(10)).current;

  const OpacityCard4 = GetInterpolate(Opacity4, [0, 1, 0]);
  const UnOpacityCard4 = GetInterpolate(UnOpacity4, [0, 0, 1]);
  const DegCard4 = GetInterpolate(RotateCard4, ["0deg", "0deg", "180deg"]);
  const UnDegCard4 = GetInterpolate(UnRotateCard4, ["0deg", "-180deg", "0deg"]);
  const rightPercentCard4 = GetInterpolate(PositionHorizontalCard4, [
    "100%",
    "100%",
    "0%",
  ]);
  const topPercentCard4 = GetInterpolate(PositionVerticalCard4, [
    "-20%",
    "-20%",
    "0%",
  ]);

  return (
    <Animated.View
      style={{
        position: "relative",
        top: topPercentCard4,
        right: rightPercentCard4,
        zIndex: 4,
      }}
    >
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          width: SizeCard4,
          height: SizeCard4,
          transform: [{ rotateY: DegCard4 }],
          opacity: OpacityCard4,
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          // source={ImageBanker ? ImageBanker[2]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Open */}
      <Animated.View
        style={{
          zIndex: 2,
          width: SizeCard4,
          height: SizeCard4,
          transform: [{ rotateY: UnDegCard4 }],
          opacity: UnOpacityCard4,
        }}
      >
        <Image
          resizeMode="contain"
          source={ImageBanker4 ? ImageBanker4 : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </Animated.View>
  );
};
