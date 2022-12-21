import React, { useEffect, useRef, useState } from "react";
import { Animated, View, Image, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";
export const BankerCard5 = ({ ImageBanker5 }) => {
  const [, setCount] = useState(0);
  const { waveGame } = useSelector(selectGame);

  useEffect(() => {
    if (waveGame % 8 == 4) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(SizeCard5, {
            useNativeDriver: false,
            toValue: 85,
            duration: 100,
          }),
          Animated.timing(PositionVerticalCard5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 100,
          }),
          Animated.timing(PositionHorizontalCard5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 100,
          }),
        ]),
        Animated.parallel([
          Animated.timing(RotateCard5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(UnRotateCard5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(Opacity5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
          Animated.timing(UnOpacity5, {
            useNativeDriver: false,
            toValue: 1,
            duration: 800,
          }),
        ]),
      ]).start();
    } else if (waveGame % 8 == 7) {
      Animated.parallel([
        Animated.timing(RotateCard5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(UnRotateCard5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(Opacity5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(UnOpacity5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 800,
        }),
        Animated.timing(SizeCard5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(PositionVerticalCard5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(PositionHorizontalCard5, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
      ]).start();
    }
  }, [waveGame]);

  const RotateCard5 = useRef(new Animated.Value(0)).current;
  const UnRotateCard5 = useRef(new Animated.Value(0)).current;
  const Opacity5 = useRef(new Animated.Value(0)).current;
  const UnOpacity5 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard5 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard5 = useRef(new Animated.Value(0)).current;
  const SizeCard5 = useRef(new Animated.Value(10)).current;

  const OpacityCard5 = GetInterpolate(Opacity5, [0, 1, 0]);
  const UnOpacityCard5 = GetInterpolate(UnOpacity5, [0, 0, 1]);
  const DegCard5 = GetInterpolate(RotateCard5, ["0deg", "0deg", "180deg"]);
  const UnDegCard5 = GetInterpolate(UnRotateCard5, ["0deg", "-180deg", "0deg"]);
  const rightPercentCard5 = GetInterpolate(PositionHorizontalCard5, [
    "200%",
    "200%",
    "0%",
  ]);
  const topPercentCard5 = GetInterpolate(PositionVerticalCard5, [
    "-20%",
    "-20%",
    "0%",
  ]);
  return (
    <Animated.View
      style={{
        position: "relative",
        top: topPercentCard5,
        right: rightPercentCard5,
        zIndex: 4,
      }}
    >
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 2,
          width: SizeCard5,
          height: SizeCard5,
          transform: [{ rotateY: DegCard5 }],
          opacity: OpacityCard5,
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
          width: SizeCard5,
          height: SizeCard5,
          transform: [{ rotateY: UnDegCard5 }],
          opacity: UnOpacityCard5,
        }}
      >
        <Image
          resizeMode="contain"
          source={ImageBanker5 ? ImageBanker5 : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
    </Animated.View>
  );
};
