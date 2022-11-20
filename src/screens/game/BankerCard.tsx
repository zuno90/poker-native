import { View } from "native-base";

import { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
import { BankerCard4 } from "./BankerCard4";
import { BankerCard5 } from "./BankerCard5";
import { getImage } from "./get";

export const BankerCard = ({ StateCard, ImageCard }) => {
  const ImageBanker = getImage(ImageCard);
  useEffect(() => {
    if (StateCard % 6 === 2) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300,
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300,
            }),
          ]),
          Animated.sequence([
            Animated.parallel([
              Animated.timing(RotateCard1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnRotateCard1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(Opacity1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnOpacity1, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
            ]),
            Animated.parallel([
              Animated.timing(RotateCard2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnRotateCard2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(Opacity2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnOpacity2, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
            ]),
            Animated.parallel([
              Animated.timing(RotateCard3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnRotateCard3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(Opacity3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
              Animated.timing(UnOpacity3, {
                useNativeDriver: false,
                toValue: 1,
                duration: 1000,
              }),
            ]),
            // Animated.parallel([
            //   Animated.timing(RotateCard4, {
            //     useNativeDriver: false,
            //     toValue: 1,
            //     duration: 1000,
            //   }),
            //   Animated.timing(UnRotateCard4, {
            //     useNativeDriver: false,
            //     toValue: 1,
            //     duration: 1000,
            //   }),
            //   Animated.timing(Opacity4, {
            //     useNativeDriver: false,
            //     toValue: 1,
            //     duration: 1000,
            //   }),
            //   Animated.timing(UnOpacity4, {
            //     useNativeDriver: false,
            //     toValue: 1,
            //     duration: 1000,
            //   }),
            // ]),
          ]),
        ]),
      ]).start();
    } else if (StateCard % 6 == 0) {
      Animated.parallel([
        Animated.timing(PositionVerticalCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(PositionHorizontalCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),

        Animated.timing(PositionVerticalCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),

        Animated.timing(PositionHorizontalCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(RotateCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnRotateCard1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000,
        }),
        Animated.timing(RotateCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnRotateCard2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000,
        }),
        Animated.timing(RotateCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnRotateCard3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 1000,
        }),
        Animated.timing(Opacity1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnOpacity1, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(Opacity2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnOpacity2, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(Opacity3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(UnOpacity3, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
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
  const SizeCard1 = useRef(new Animated.Value(100)).current;
  const SizeCard2 = useRef(new Animated.Value(100)).current;
  const SizeCard3 = useRef(new Animated.Value(100)).current;
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

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "1100deg"]);
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "1100deg"]);
  const DegCard3 = GetInterpolate(RotateCard3, ["0deg", "0deg", "1100deg"]);

  const UnDegCard1 = GetInterpolate(UnRotateCard1, [
    "0deg",
    "-1100deg",
    "0deg",
  ]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, [
    "0deg",
    "-1100deg",
    "0deg",
  ]);
  const UnDegCard3 = GetInterpolate(UnRotateCard3, [
    "0deg",
    "-1100deg",
    "0deg",
  ]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);
  const OpacityCard3 = GetInterpolate(Opacity3, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const UnOpacityCard3 = GetInterpolate(UnOpacity3, [0, 0, 1]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: "58%",
        // right: "18%",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
        // width: 40,
        // backgroundColor: "white",
      }}
    >
      {/* Card1 */}

      <View style={{ position: "relative" }}>
        {/* Close */}
        <Animated.View
          style={{
            zIndex: 2,
            position: "absolute",

            width: 85,
            height: 85,
            transform: [{ rotateY: DegCard1 }],
            opacity: OpacityCard1,
          }}
        >
          {/* <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: 85,
            height: 85,
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
      </View>

      {/* Card2 */}

      <View style={{ position: "relative" }}>
        {/* Close */}
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 2,
            width: 85,
            height: 85,
            transform: [{ rotateY: DegCard2 }],
            opacity: OpacityCard2,
          }}
        >
          {/* <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: 85,
            height: 85,
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
      </View>

      {/* Card3 */}

      <View style={{ position: "relative" }}>
        {/* Close */}
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 2,
            width: 85,
            height: 85,
            transform: [{ rotateY: DegCard3 }],
            opacity: OpacityCard3,
          }}
        >
          {/* <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </Animated.View>
        {/* Open */}
        <Animated.View
          style={{
            zIndex: 2,
            width: 85,
            height: 85,
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
      </View>

      {/* Card 4*/}

      <BankerCard4
        StateCard={StateCard}
        ImageBanker4={ImageBanker ? ImageBanker[1]?.image : []}
      ></BankerCard4>

      {/* Card 5 */}
      <BankerCard5
        StateCard={StateCard}
        ImageBanker5={ImageBanker ? ImageBanker[0]?.image : []}
      ></BankerCard5>
    </View>
  );
};
