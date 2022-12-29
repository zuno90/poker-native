import { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";

export const BankerCard2 = ({ ImageCard }) => {
  const { waveGame } = useSelector(selectGame);

  useEffect(() => {
    if (waveGame % 10 === 2) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              delay: 500,
              useNativeDriver: false,
              toValue: 85,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard2, {
              delay: 300,

              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard2, {
              delay: 500,

              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),

          Animated.sequence([
            Animated.parallel([
              Animated.timing(RotateCard2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnRotateCard2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(Opacity2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnOpacity2, {
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
        Animated.timing(PositionVerticalCard2, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),

        Animated.timing(PositionHorizontalCard2, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),

        Animated.timing(SizeCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),

        Animated.timing(RotateCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnRotateCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),

        Animated.timing(Opacity2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnOpacity2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
      ]).start();
    }
  }, [waveGame]);
  // console.log(waveGame % 8, "wave Banker");
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;

  const SizeCard2 = useRef(new Animated.Value(0)).current;

  const RotateCard2 = useRef(new Animated.Value(0)).current;

  const UnRotateCard2 = useRef(new Animated.Value(0)).current;

  const Opacity2 = useRef(new Animated.Value(-1)).current;

  const UnOpacity2 = useRef(new Animated.Value(0)).current;

  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "180deg"]);

  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard2 = GetInterpolate(Opacity2, [0, 1, 0]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);

  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "-20%",
    "-20%",
    "0%",
  ]);
  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-100%",
    "-100%",
    "0%",
  ]);

  return (
    <Animated.View
      style={{
        position: "relative",
        top: topPercentCard2,
        right: rightPercentCard2,
        zIndex: 2,
      }}
    >
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          transform: [{ rotateY: DegCard2 }],
          opacity: OpacityCard2,
        }}
      >
        <Animated.Image
          resizeMethod={"scale"}
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: SizeCard2, height: SizeCard2 }}
        />
      </Animated.View>
      {/* Open */}
      <Animated.View
        style={{
          zIndex: 3,
          transform: [{ rotateY: UnDegCard2 }],
          opacity: UnOpacityCard2,
        }}
      >
        <Animated.Image
          resizeMethod={"scale"}
          resizeMode="contain"
          source={ImageCard ? ImageCard : ""}
          style={{ width: SizeCard2, height: SizeCard2 }}
        />
      </Animated.View>
    </Animated.View>
  );
};
