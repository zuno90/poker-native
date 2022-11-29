import { View } from "native-base";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameContext } from "../../context/GameContext";
import { GetInterpolate } from "../../utils/getInterpolate";
import { gameAction, selectGame } from "./GameSlice";
import { getImage } from "./get";

export const FakeUser1 = ({ ImageCard, profile }) => {
  const dispatch = useDispatch();
  const { room } = useContext(GameContext);
  const [card, setCard] = useState([]);
  const [totalCard, setTotalCard] = useState();
  const { profileUser1 } = useSelector(selectGame);
  const { waveGame } = useSelector(selectGame);
  console.log(profileUser1, "profileUser1");
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/♠5.png") },
    { image: require("../../../assets/deckofcard/♠5.png") },
  ]);
  useEffect(() => {
    if (profileUser1.cards) {
      setGetCard(getImage(profileUser1.cards));
      console.log(getCard, "get");
    }
  }, [waveGame]);
  console.log(waveGame, "wave Game user1");

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (waveGame % 7 == 0) {
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
    } else if (waveGame % 7 == 4) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              useNativeDriver: false,
              toValue: 85,
              duration: 300,
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              toValue: -1,
              duration: 300,
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              toValue: 0,
              duration: 300,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: -1,
              duration: 400,
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(UnOpacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 85,
              duration: 300,
            }),
            Animated.timing(PositionVerticalCard2, {
              useNativeDriver: false,
              toValue: -1,
              duration: 300,
            }),

            Animated.timing(PositionHorizontalCard2, {
              useNativeDriver: false,
              toValue: 0,
              duration: 300,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: -1,
              duration: 400,
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(UnOpacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
          ]),
        ]),
      ]).start();
    } else if (waveGame % 7 == 5) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(OpacityWinLose, {
            toValue: 0.8,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(OpacityWinLose, {
            toValue: 1,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(OpacityWinLose, {
            toValue: 0.2,
            useNativeDriver: false,
            duration: 300,
          }),
        ])
      ).start();
    } else if (waveGame % 7 == 6) {
      Animated.timing(OpacityWinLose, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
      }).start(),
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
  }, [waveGame]);
  useEffect(() => {
    if (count % 3 == 1) {
      Animated.sequence([
        Animated.timing(OpacityBetChip, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
        }),
        Animated.parallel([
          Animated.timing(PositionVerticalChipBet, {
            toValue: 0,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(PositionHorizontalChipBet, {
            toValue: 0,
            useNativeDriver: false,
            duration: 300,
          }),
        ]),
      ]).start();
    } else if (count % 3 == 2) {
      Animated.parallel([
        Animated.timing(PositionVerticalChipBet, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
        }),
        Animated.timing(PositionHorizontalChipBet, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
        }),
      ]).start();
    } else if (count % 3 == 0) {
      Animated.sequence([
        Animated.timing(OpacityBetChip, {
          toValue: 0,
          useNativeDriver: false,
          duration: 300,
        }),
        Animated.parallel([
          Animated.timing(PositionVerticalChipBet, {
            toValue: -1,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(PositionHorizontalChipBet, {
            toValue: -1,
            useNativeDriver: false,
            duration: 300,
          }),
        ]),
      ]).start();
    }
  }, [count]);
  // useEffect(() => {
  //   if (waveGame % 6 == 1) {
  //     Animated.sequence([
  //       Animated.sequence([
  //         Animated.parallel([
  //           Animated.timing(SizeCard1, {
  //             delay: 1100,
  //             toValue: 35,
  //             useNativeDriver: false,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionVerticalCard1, {
  //             delay: 1100,

  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionHorizontalCard1, {
  //             delay: 1100,

  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 300,
  //           }),
  //         ]),
  //         Animated.parallel([
  //           Animated.timing(RotateCard1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnRotateCard1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(Opacity1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //         ]),
  //       ]),
  //       Animated.sequence([
  //         Animated.parallel([
  //           Animated.timing(SizeCard2, {
  //             useNativeDriver: false,
  //             toValue: 35,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionVerticalCard2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 300,
  //           }),

  //           Animated.timing(PositionHorizontalCard2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 300,
  //           }),
  //         ]),
  //         Animated.parallel([
  //           Animated.timing(RotateCard2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnRotateCard2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(Opacity2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //         ]),
  //       ]),
  //     ]).start();
  //   } else if (waveGame % 6 == 5) {
  //     Animated.sequence([
  //       Animated.sequence([
  //         Animated.parallel([
  //           Animated.timing(SizeCard1, {
  //             useNativeDriver: false,
  //             toValue: 85,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionVerticalCard1, {
  //             useNativeDriver: false,
  //             toValue: -1,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionHorizontalCard1, {
  //             useNativeDriver: false,
  //             toValue: 0,
  //             duration: 300,
  //           }),
  //         ]),
  //         Animated.parallel([
  //           Animated.timing(RotateCard1, {
  //             useNativeDriver: false,
  //             toValue: -1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnRotateCard1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(Opacity1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnOpacity1, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //         ]),
  //       ]),
  //       Animated.sequence([
  //         Animated.parallel([
  //           Animated.timing(SizeCard2, {
  //             useNativeDriver: false,
  //             toValue: 85,
  //             duration: 300,
  //           }),
  //           Animated.timing(PositionVerticalCard2, {
  //             useNativeDriver: false,
  //             toValue: -1,
  //             duration: 300,
  //           }),

  //           Animated.timing(PositionHorizontalCard2, {
  //             useNativeDriver: false,
  //             toValue: 0,
  //             duration: 300,
  //           }),
  //         ]),
  //         Animated.parallel([
  //           Animated.timing(RotateCard2, {
  //             useNativeDriver: false,
  //             toValue: -1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnRotateCard2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(Opacity2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //           Animated.timing(UnOpacity2, {
  //             useNativeDriver: false,
  //             toValue: 1,
  //             duration: 400,
  //           }),
  //         ]),
  //       ]),
  //     ]).start();
  //   } else if (waveGame % 6 == 0) {
  //     Animated.timing(SizeCard1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(SizeCard2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(PositionVerticalCard1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(PositionHorizontalCard1, {
  //       useNativeDriver: false,
  //       toValue: -1,
  //       duration: 300,
  //     }).start();

  //     Animated.timing(PositionVerticalCard2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();

  //     Animated.timing(PositionHorizontalCard2, {
  //       useNativeDriver: false,
  //       toValue: -1,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(RotateCard1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(UnRotateCard1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 400,
  //     }).start();
  //     Animated.timing(RotateCard2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(UnRotateCard2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 400,
  //     }).start();
  //     Animated.timing(Opacity1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(UnOpacity1, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(Opacity2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //     Animated.timing(UnOpacity2, {
  //       useNativeDriver: false,
  //       toValue: 0,
  //       duration: 300,
  //     }).start();
  //   }
  // }, [waveGame]);
  useEffect(() => {
    if (count % 2 == 1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(OpacityWinLose, {
            toValue: 0.8,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(OpacityWinLose, {
            toValue: 1,
            useNativeDriver: false,
            duration: 1000,
          }),
          Animated.timing(OpacityWinLose, {
            toValue: 0.2,
            useNativeDriver: false,
            duration: 300,
          }),
        ])
      ).start();
    } else if (count % 2 == 0) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(PositionVerticalChipBet, {
            toValue: 1,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(PositionHorizontalChipBet, {
            toValue: 1,
            useNativeDriver: false,
            duration: 300,
          }),
        ]),
        Animated.timing(OpacityBetChip, {
          toValue: 0,
          useNativeDriver: false,
          duration: 300,
        }),
        Animated.parallel([
          Animated.timing(PositionVerticalChipBet, {
            toValue: -1,
            useNativeDriver: false,
            duration: 300,
          }),
          Animated.timing(PositionHorizontalChipBet, {
            toValue: -1,
            useNativeDriver: false,
            duration: 300,
          }),
        ]),
      ]).start();
    }
  }, [count]);
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalChipBet = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalChipBet = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(30)).current;
  const SizeCard2 = useRef(new Animated.Value(30)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityWinLose = useRef(new Animated.Value(0)).current;
  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;
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
    "-700%",
    "100%",
    "0%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "5%",
    "-200%",
    "0%",
  ]);
  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-0%",
    "100%",
    "0%",
  ]);
  const bottomPercentBetChip = GetInterpolate(PositionVerticalChipBet, [
    "0%",
    "110%",
    "300%",
  ]);
  const rightPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "150%",
    "-150%",
    "-450%",
  ]);
  return (
    <View
      style={{
        position: "absolute",
        bottom: "25%",
        left: "15%",
        zIndex: 5,
      }}
    >
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
              opacity: OpacityCard1,
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
              transform: [{ rotateZ: DegCard1 }],
              opacity: UnOpacityCard1,
              top: topPercentCard1,
              right: rightPercentCard1,
            }}
          >
            <Image
              resizeMode="contain"
              // source={require("../../../assets/deckofcard/A♠.png")}
              source={getCard ? getCard[0]?.image : ""}
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
              opacity: OpacityCard2,
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
              opacity: UnOpacityCard2,
              top: topPercentCard2,
              right: rightPercentCard2,
            }}
          >
            <Image
              resizeMode="contain"
              // source={require("../../../assets/deckofcard/A♠.png")}
              source={getCard ? getCard[1]?.image : ""}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </View>
      </View>
      {/* Win | Lose */}
      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: 14,
          top: "-80%",
          left: "-50%",
          opacity: OpacityWinLose,
        }}
      >
        <Image
          resizeMode="contain"
          source={
            profileUser1?.isWinner === false
              ? require("../../../assets/Lose.png")
              : require("../../../assets/Win.png")
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>
      <Text
        numberOfLines={1}
        style={{
          color: "white",
          position: "absolute",
          bottom: -20,
          width: 80,
          overflow: "hidden",
          height: 20,
        }}
      >
        {profileUser1?.id ? profileUser1?.id : "" || "Bot-man"}
      </Text>
      <Text
        style={{
          color: "white",
          position: "absolute",
          bottom: 0,
          width: 70,
          left: -48,
          zIndex: 10,
        }}
      >
        {profileUser1?.chips > 1000
          ? profileUser1?.chips / 1000 + " k"
          : profileUser1?.chips}
      </Text>
      <Animated.Text
        style={{
          color: "white",
          position: "absolute",
          zIndex: 4,
          bottom: bottomPercentBetChip,
          right: rightPercentBetChip,
          opacity: OpacityBetChip,
        }}
      >
        {profileUser1?.betChips > 0 ? profileUser1?.betChips : "1k"}
      </Animated.Text>
      {/* <Image
        resizeMode="contain"
        style={{
          width: 200,
          height: 200,
          zIndex: 12,
          position: "absolute",
          backgroundColor: "white",
          top: 0,
          right: 0,
        }}
        source={{
          uri: "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?resize=476%2C280&ssl=1",
        }}
      /> */}
      {/* <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
        }}
        style={{
          position: "absolute",
          right: "-500%",
          top: 0,
          width: 50,
          height: 50,
          // backgroundColor: "black",
          zIndex: 100,
        }}
      >
        <Text>TouchableOpacity</Text>
      </TouchableOpacity> */}
    </View>
  );
};
