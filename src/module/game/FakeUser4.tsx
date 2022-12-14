import { View, Image } from "native-base";

import { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { useSelector } from "react-redux";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";
import { getImage } from "./get";

export const FakeUser4 = ({ handleAction }) => {
  const [count, setCount] = useState(0);
  const { profileUser4 } = useSelector(selectGame);
  const { currentPlayer } = useSelector(selectGame);

  const { waveGame } = useSelector(selectGame);
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/5♠.png") },
    { image: require("../../../assets/deckofcard/5♠.png") },
  ]);
  useEffect(() => {
    if (profileUser4.cards) {
      setGetCard(getImage(profileUser4.cards));
    }
  }, [waveGame]);
  // console.log(profileUser4, "ProfileUser4");
  useEffect(() => {
    if (waveGame % 8 == 1) {
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
    } else if (waveGame % 8 == 5) {
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
        Animated.timing(OpacityRanking, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
        }),
      ]).start();
    } else if (waveGame % 8 == 6) {
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
    } else if (waveGame % 8 == 7) {
      Animated.timing(OpacityRanking, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
      }).start(),
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
  // useEffect(() => {
  //   if (count % 2 == 1) {
  //     Animated.sequence([
  //       Animated.timing(OpacityBetChip, {
  //         toValue: 1,
  //         useNativeDriver: false,
  //         duration: 300,
  //       }),
  //       Animated.parallel([
  //         Animated.timing(PositionVerticalChipBet, {
  //           toValue: 0,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //         Animated.timing(PositionHorizontalChipBet, {
  //           toValue: 0,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //       ]),
  //     ]).start();
  //   } else if (count % 2 == 0) {
  //     Animated.sequence([
  //       Animated.parallel([
  //         Animated.timing(PositionVerticalChipBet, {
  //           toValue: 1,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //         Animated.timing(PositionHorizontalChipBet, {
  //           toValue: 1,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //       ]),
  //       Animated.timing(OpacityBetChip, {
  //         toValue: 0,
  //         useNativeDriver: false,
  //         duration: 300,
  //       }),
  //       Animated.parallel([
  //         Animated.timing(PositionVerticalChipBet, {
  //           toValue: -1,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //         Animated.timing(PositionHorizontalChipBet, {
  //           toValue: -1,
  //           useNativeDriver: false,
  //           duration: 300,
  //         }),
  //       ]),
  //     ]).start();
  //   }
  // }, [count]);
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
  const SizeCard1 = useRef(new Animated.Value(40)).current;
  const SizeCard2 = useRef(new Animated.Value(40)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(1)).current;
  const Opacity2 = useRef(new Animated.Value(1)).current;
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityRanking = useRef(new Animated.Value(0)).current;

  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "30deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "-10deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);
  const OpacityWinLose = useRef(new Animated.Value(0)).current;

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const topPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "5%",
    "-200%",
    "0%",
  ]);
  const leftPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "-720%",
    "-85%",
    "0%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "5%",
    "-200%",
    "0%",
  ]);
  const leftPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-900%",
    "-85%",
    "0%",
  ]);
  const bottomPercentBetChip = GetInterpolate(PositionVerticalChipBet, [
    "25%",
    "80%",
    "220%",
  ]);
  const rightPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "-25%",
    "150%",
    "350%",
  ]);

  return Object.keys(profileUser4).length !== 0 ? (
    <View style={{ position: "absolute", bottom: "20%", right: "15%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: 50,
          height: 60,
          zIndex: 2,
        }}
      >
        <Image
          alt="sad"
          source={require("../../../assets/AvatarExample.png")}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
            zIndex: 13,
          }}
        />
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
              left: leftPercentCard1,
            }}
          >
            <Image
              alt="sad"
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
              left: leftPercentCard1,
            }}
          >
            <Image
              alt="sad"
              resizeMode="contain"
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
              left: leftPercentCard2,
            }}
          >
            <Image
              alt="sad"
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
              left: leftPercentCard2,
            }}
          >
            <Image
              alt="sad"
              resizeMode="contain"
              source={getCard ? getCard[1]?.image : ""}
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </View>
      </View>
      {/* Ranking */}
      <Animated.Text
        style={{
          fontWeight: "500",
          position: "absolute",
          bottom: -30,
          left: "0%",
          width: 150,
          zIndex: 13,
          opacity: OpacityRanking,
        }}
      >
        {profileUser4.cardRank}
      </Animated.Text>
      {/* Win | Lose */}

      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: 14,
          top: "-60%",
          right: "-50%",
          opacity: OpacityWinLose,
        }}
      >
        <Image
          alt="sad"
          resizeMode="contain"
          source={
            profileUser4?.isWinner === false
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
          width: 70,
          overflow: "hidden",
          height: 20,
          zIndex: 5,
        }}
      >
        {profileUser4?.username ? profileUser4?.username : profileUser4?.id}
      </Text>
      <Text
        style={{
          color: "white",
          position: "absolute",
          bottom: 20,
          width: 70,
          right: -60,

          zIndex: 10,
        }}
      >
        {profileUser4?.chips > 1000
          ? profileUser4?.chips / 1000 + " 4k"
          : profileUser4?.chips}
      </Text>
      <Animated.Text
        style={{
          color: "white",
          position: "absolute",
          zIndex: 10,
          bottom: bottomPercentBetChip,
          right: rightPercentBetChip,
          opacity: OpacityBetChip,
        }}
      >
        {profileUser4?.betChips > 0 ? profileUser4?.betChips : ""}
      </Animated.Text>
    </View>
  ) : (
    <></>
  );
};
