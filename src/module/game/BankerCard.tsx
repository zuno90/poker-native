import { Box, Flex, View } from "native-base";

import { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { BankerCard2 } from "./BankerCard2";
import { BankerCard3 } from "./BankerCard3";
import { BankerCard4 } from "./BankerCard4";
import { BankerCard5 } from "./BankerCard5";
import { selectGame } from "./GameSlice";
import { getImage } from "./get";
import { Image } from "native-base";

export const BankerCard = ({ ImageCard }) => {
  const ImageBanker = getImage(ImageCard);
  const { waveGame } = useSelector(selectGame);

  useEffect(() => {
    if (waveGame % 10 === 2) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              useNativeDriver: false,
              toValue: 85,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 85,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
          Animated.parallel([
            Animated.timing(SizeCard3, {
              useNativeDriver: false,
              toValue: 85,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard3, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard3, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
          Animated.sequence([
            Animated.parallel([
              Animated.timing(RotateCard1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnRotateCard1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(Opacity1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
              Animated.timing(UnOpacity1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 500,
              }),
            ]),
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
        Animated.timing(PositionVerticalCard1, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),
        Animated.timing(PositionHorizontalCard1, {
          useNativeDriver: false,
          toValue: -1,
          duration: 100,
        }),

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
        Animated.timing(RotateCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(SizeCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(SizeCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(SizeCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnRotateCard1, {
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
        Animated.timing(Opacity1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 100,
        }),
        Animated.timing(UnOpacity1, {
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
  // console.log(waveGame % 8, "wave Banker");
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard3 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard3 = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(0)).current;
  const SizeCard2 = useRef(new Animated.Value(0)).current;
  const SizeCard3 = useRef(new Animated.Value(0)).current;
  const RotateCard1 = useRef(new Animated.Value(0)).current;
  const RotateCard2 = useRef(new Animated.Value(0)).current;
  const RotateCard3 = useRef(new Animated.Value(0)).current;

  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const UnRotateCard3 = useRef(new Animated.Value(0)).current;

  const Opacity1 = useRef(new Animated.Value(-1)).current;
  const Opacity2 = useRef(new Animated.Value(-1)).current;
  const Opacity3 = useRef(new Animated.Value(-1)).current;

  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;
  const UnOpacity3 = useRef(new Animated.Value(0)).current;

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "180deg"]);
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "180deg"]);
  const DegCard3 = GetInterpolate(RotateCard3, ["0deg", "0deg", "180deg"]);

  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);
  const UnDegCard3 = GetInterpolate(UnRotateCard3, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 1, 0]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 1, 0]);
  const OpacityCard3 = GetInterpolate(Opacity3, [0, 1, 0]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const UnOpacityCard3 = GetInterpolate(UnOpacity3, [0, 0, 1]);
  const topPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "-20%",
    "-20%",
    "0%",
  ]);
  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "-100%",
    "-200%",
    "0%",
  ]);
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
    <Flex
      direction="row"
      style={{
        position: "absolute",
        bottom: "50%",
        flexDirection: "row",
      }}
    >
      {/* Card1 */}

      <Animated.View
        style={{
          zIndex: 2,

          position: "relative",
          top: topPercentCard1,
          right: rightPercentCard1,
        }}
      >
        {/* Close */}
        <Animated.View
          style={{
            position: "absolute",

            transform: [{ rotateY: DegCard1 }],
            opacity: OpacityCard1,
          }}
        >
          <Animated.Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: SizeCard1, height: SizeCard1 }}
          />
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,

            transform: [{ rotateY: UnDegCard1 }],
            opacity: UnOpacityCard1,
          }}
        >
          <Animated.Image
            resizeMode="contain"
            source={ImageBanker ? ImageBanker[4]?.image : ""}
            style={{ width: SizeCard1, height: SizeCard1 }}
          />
        </Animated.View>
      </Animated.View>

      {/* Card2 */}
      <BankerCard2 ImageCard={ImageBanker ? ImageBanker[3]?.image : []} />

      {/* Card3 */}
      <BankerCard3 ImageCard={ImageBanker ? ImageBanker[2]?.image : []} />

      {/* Card 4*/}

      <BankerCard4 ImageBanker4={ImageBanker ? ImageBanker[1]?.image : []} />

      {/* Card 5 */}
      <BankerCard5 ImageBanker5={ImageBanker ? ImageBanker[0]?.image : []} />
    </Flex>
  );
};
