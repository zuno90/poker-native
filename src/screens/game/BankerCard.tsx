import { View } from "native-base";

import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
import { BankerCard4 } from "./BankerCard4";
import { BankerCard5 } from "./BankerCard5";
import { getImage } from "./get";

export const BankerCard = ({ StateCard, ImageCard }) => {
  const ImageBanker = getImage(ImageCard);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (StateCard % 6 === 2) {
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
    } else if (StateCard % 6 == 0) {
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
  }, [StateCard]);

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

  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const Opacity3 = useRef(new Animated.Value(0)).current;

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
    <View
      style={{
        position: "absolute",
        bottom: "48%",
        display: "flex",
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
            width: SizeCard1,
            height: SizeCard1,
            transform: [{ rotateY: DegCard1 }],
            opacity: OpacityCard1,
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: SizeCard1,
            height: SizeCard1,
            transform: [{ rotateY: UnDegCard1 }],
            opacity: UnOpacityCard1,
          }}
        >
          <Image
            resizeMode="contain"
            source={ImageBanker ? ImageBanker[4]?.image : ""}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </Animated.View>

      {/* Card2 */}

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
            width: SizeCard2,
            height: SizeCard2,
            position: "absolute",

            transform: [{ rotateY: DegCard2 }],
            opacity: OpacityCard2,
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: SizeCard2,
            height: SizeCard2,
            transform: [{ rotateY: UnDegCard2 }],
            opacity: UnOpacityCard2,
          }}
        >
          <Image
            resizeMode="contain"
            source={ImageBanker ? ImageBanker[3]?.image : ""}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </Animated.View>

      {/* Card3 */}

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
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: SizeCard3,
            height: SizeCard3,
            transform: [{ rotateY: UnDegCard3 }],
            opacity: UnOpacityCard3,
          }}
        >
          <Image
            resizeMode="contain"
            source={ImageBanker ? ImageBanker[2]?.image : ""}
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </Animated.View>

      {/* Card 4*/}

      <BankerCard4
        StateCard={StateCard}
        ImageBanker4={ImageBanker ? ImageBanker[1]?.image : []}
      />

      {/* Card 5 */}
      <BankerCard5
        StateCard={StateCard}
        ImageBanker5={ImageBanker ? ImageBanker[0]?.image : []}
      />
    </View>
  );
};
