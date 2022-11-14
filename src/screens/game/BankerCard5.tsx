import React, { useEffect, useRef } from "react";
import { Animated, View, Image } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
export const BankerCard5 = ({ StateCard, ImageBanker5 }) => {
  const RotateCard5 = useRef(new Animated.Value(0)).current;
  const UnRotateCard5 = useRef(new Animated.Value(0)).current;
  const Opacity5 = useRef(new Animated.Value(0)).current;
  const UnOpacity5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (StateCard % 6 == 4) {
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
      ]).start();
    } else if (StateCard % 6 == 0) {
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
      ]).start();
    }
  }, [StateCard]);

  const OpacityCard5 = GetInterpolate(Opacity5, [0, 0, 1]);
  const UnOpacityCard5 = GetInterpolate(UnOpacity5, [0, 0, 1]);
  const DegCard5 = GetInterpolate(RotateCard5, ["0deg", "0deg", "180deg"]);
  const UnDegCard5 = GetInterpolate(UnRotateCard5, ["0deg", "-180deg", "0deg"]);

  return (
    <View style={{ position: "relative" }}>
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 2,
          width: 100,
          height: 100,
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
          width: 100,
          height: 100,
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
    </View>
  );
};
