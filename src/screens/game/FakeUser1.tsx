import { View } from "native-base";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";

export const FakeUser1 = ({ StateCard, ImageCard }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (StateCard % 6 == 1) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              delay: 500,
              useNativeDriver: false,
              toValue: 35,
              duration: 100,
            }),
            Animated.timing(PositionVerticalCard1, {
              delay: 500,

              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalCard1, {
              delay: 500,

              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 35,
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
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
        ]),
      ]).start();
    } else if (StateCard % 6 == 5) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              useNativeDriver: false,
              toValue: 70,
              duration: 100,
            }),
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
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 0,
              duration: 100,
            }),
            Animated.timing(UnOpacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 70,
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
          ]),
          Animated.parallel([
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 0,
              duration: 100,
            }),
            Animated.timing(UnOpacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 100,
            }),
          ]),
        ]),
      ]).start();
    } else if (StateCard % 6 == 0) {
      Animated.timing(SizeCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(SizeCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(PositionVerticalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(PositionHorizontalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();

      Animated.timing(PositionVerticalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();

      Animated.timing(PositionHorizontalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(RotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(UnRotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(RotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(UnRotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(Opacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(UnOpacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(Opacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
      Animated.timing(UnOpacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 100,
      }).start();
    }
  }, [StateCard]);

  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;

  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(30)).current;
  const SizeCard2 = useRef(new Animated.Value(30)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(1)).current;
  const Opacity2 = useRef(new Animated.Value(1)).current;
  const UnOpacity1 = useRef(new Animated.Value(1)).current;
  const UnOpacity2 = useRef(new Animated.Value(1)).current;
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "30deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "-10deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const topPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "5%",
    "-200%",
    "0%",
  ]);
  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "100%",
    "-700%",
    "0%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "5%",
    "-200%",
    "0%",
  ]);
  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "100%",
    "-750%",
    "0%",
  ]);
  return (
    <View style={{ position: "absolute", bottom: "25%", left: "15%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          width: 50,
          height: 60,
          zIndex: 2,
        }}
      >
        <View style={{ position: "relative", marginLeft: 28 }}>
          {/* Close */}
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 2,
              width: SizeCard1,
              height: SizeCard1,
              transform: [{ rotateZ: DegCard1 }],
              opacity: 1,
              top: topPercentCard1,
              right: rightPercentCard1,
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
              transform: [{ rotateZ: "45deg" }],
              opacity: 0,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../../assets/deckofcard/A♠.png")}
              //   source={ImageCard ? ImageCard[0]?.image : ""}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </View>
        <View style={{ position: "relative", marginLeft: -20 }}>
          {/* Close Card2 */}
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 2,
              width: SizeCard2,
              height: SizeCard2,
              transform: [{ rotateZ: DegCard2 }],
              opacity: 1,
              top: topPercentCard2,
              right: rightPercentCard2,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../../assets/deckofcard/CloseCard.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
          {/* OpenCard2 */}
          <Animated.View
            style={{
              zIndex: 2,
              width: SizeCard2,
              height: SizeCard2,
              transform: [{ rotateY: UnDegCard2 }],
              opacity: 0,
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../../assets/deckofcard/A♠.png")}
              //   source={ImageCard ? ImageCard[1]?.image : ""}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </View>
      </View>
      <Text style={{ color: "white" }}>userName</Text>
      <Text
        style={{
          color: "white",
          position: "absolute",
          bottom: 20,
          width: 70,
          left: -48,

          zIndex: 10,
        }}
      >
        166.2k
      </Text>
      <Text
        style={{
          color: "white",
          position: "absolute",
          zIndex: 10,
          bottom: 64,
          right: -80,
        }}
      >
        5.00k
      </Text>
      {/* <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
        }}
        style={{
          position: "absolute",
          right: "-400%",
          top: 0,
          width: 50,
          height: 50,
          backgroundColor: "black",
          zIndex: 100,
        }}
      >
        <Text>TouchableOpacity</Text>
      </TouchableOpacity> */}
    </View>
  );
};
