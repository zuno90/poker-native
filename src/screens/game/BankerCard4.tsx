import React, { useEffect, useRef } from "react";
import { Animated, View, Image } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";

export const BankerCard4 = ({ StateCard, ImageBanker4 }) => {
  const RotateCard4 = useRef(new Animated.Value(0)).current;
  const UnRotateCard4 = useRef(new Animated.Value(0)).current;
  const Opacity4 = useRef(new Animated.Value(0)).current;
  const UnOpacity4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (StateCard % 6 === 3) {
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
      ]).start();
    } else if (StateCard % 6 == 0) {
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
      ]).start();
    }
  }, [StateCard]);
  const OpacityCard4 = GetInterpolate(Opacity4, [0, 0, 1]);
  const UnOpacityCard4 = GetInterpolate(UnOpacity4, [0, 0, 1]);
  const DegCard4 = GetInterpolate(RotateCard4, ["0deg", "0deg", "180deg"]);
  const UnDegCard4 = GetInterpolate(UnRotateCard4, ["0deg", "-180deg", "0deg"]);

  return (
    <View style={{ position: "relative" }}>
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 2,
          width: 100,
          height: 100,
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
          width: 100,
          height: 100,
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
    </View>
  );
};
