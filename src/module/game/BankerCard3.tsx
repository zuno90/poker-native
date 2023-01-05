import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";
import { Image } from "native-base";

export const BankerCard3 = ({ ImageCard }) => {
  const { waveGame } = useSelector(selectGame);
  useEffect(() => {
    if (waveGame % 10 === 2) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard3, {
              delay: 1000,
              useNativeDriver: false,
              toValue: 85,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard3, {
              delay: 1000,
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard3, {
              delay: 1000,
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
          Animated.sequence([
            Animated.parallel([
              Animated.timing(RotateCard3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnRotateCard3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(Opacity3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnOpacity3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
            ]),
          ]),
        ]),
      ]).start();
    } else if (waveGame % 10 == 7) {
      Animated.parallel([
        Animated.timing(PositionVerticalCard3, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),

        Animated.timing(PositionHorizontalCard3, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),

        Animated.timing(SizeCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),

        Animated.timing(RotateCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnRotateCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),

        Animated.timing(Opacity3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnOpacity3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
      ]).start();
    }
  }, [waveGame]);

  const PositionVerticalCard3 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard3 = useRef(new Animated.Value(0)).current;
  const SizeCard3 = useRef(new Animated.Value(0)).current;

  const RotateCard3 = useRef(new Animated.Value(0)).current;
  const UnRotateCard3 = useRef(new Animated.Value(0)).current;

  const Opacity3 = useRef(new Animated.Value(-1)).current;
  const UnOpacity3 = useRef(new Animated.Value(0)).current;

  const DegCard3 = GetInterpolate(RotateCard3, ["0deg", "0deg", "180deg"]);
  const UnDegCard3 = GetInterpolate(UnRotateCard3, ["0deg", "-180deg", "0deg"]);

  const OpacityCard3 = GetInterpolate(Opacity3, [0, 1, 0]);
  const UnOpacityCard3 = GetInterpolate(UnOpacity3, [0, 0, 1]);
  const topPercentCard3 = GetInterpolate(PositionVerticalCard3, [
    "-20%",
    "-20%",
    "0%",
  ]);
  const rightPercentCard3 = GetInterpolate(PositionHorizontalCard3, [
    "-100%",
    "0%",
    "0%",
  ]);
  return (
    <Animated.View
      style={{
        position: "relative",
        top: topPercentCard3,
        right: rightPercentCard3,
        zIndex: 2,
      }}
    >
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 2,
          width: SizeCard3,
          height: SizeCard3,
          transform: [{ rotateY: DegCard3 }],
          opacity: OpacityCard3,
        }}
      >
        <Animated.Image
          resizeMethod={"scale"}
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: SizeCard3, height: SizeCard3 }}
        />
      </Animated.View>
      {/* Open */}
      <Animated.View
        style={{
          zIndex: 4,
          width: SizeCard3,
          height: SizeCard3,
          transform: [{ rotateY: UnDegCard3 }],
          opacity: UnOpacityCard3,
        }}
      >
        <Animated.Image
          resizeMethod={"scale"}
          resizeMode="contain"
          source={ImageCard ? ImageCard : ""}
          style={{ width: SizeCard3, height: SizeCard3 }}
        />
      </Animated.View>
    </Animated.View>
  );
};
