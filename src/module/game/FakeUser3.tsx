import { Image, View } from "native-base";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { useSelector } from "react-redux";
import { GameContext } from "../../context/GameContext";
import { GetInterpolate } from "../../utils/getInterpolate";
import { selectGame } from "./GameSlice";
import { getImage } from "./get";
export const FakeUser3 = ({ handleAction }) => {
  const [count, setCount] = useState(0);
  const { profileFake3 } = useContext(GameContext);
  const { profileUser3 } = useSelector(selectGame);
  const { waveGame } = useSelector(selectGame);
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/5♠.png") },
    { image: require("../../../assets/deckofcard/5♠.png") },
  ]);
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
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityWinLose = useRef(new Animated.Value(0)).current;
  const OpacityRanking = useRef(new Animated.Value(0)).current;

  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (profileUser3.cards) {
      setGetCard(getImage(profileUser3.cards));
    }
  }, [waveGame]);
  // console.log(profileUser3, "ProfileUser3");

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
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "30deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "-10deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const topPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "-35%",
    "-0%",
    "0%",
  ]);
  const leftPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "-950%",
    "-100%",
    "0%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "-35%",
    "-0%",
    "0%",
  ]);
  const leftPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-1200%",
    "-100%",
    "0%",
  ]);
  const bottomPercentBetChip = GetInterpolate(PositionVerticalChipBet, [
    "25%",
    "30%",
    "70%",
  ]);
  const rightPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "-0%",
    "150%",
    "400%",
  ]);

  return Object.keys(profileUser3).length !== 0 ? (
    <View style={{ position: "absolute", bottom: "55%", right: "4%" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",

          width: 50,
          height: 60,
          zIndex: 2,
        }}
      >
        {/* <TouchableOpacity
          onPress={() => {
            // handleAction("RAISE", { chips: 5000, id: "ạdháhdjkhkádukahsd" });
            profileFake3.send("CALL", 5000);
          }}
          style={{
            position: "absolute",
            top: "200%",
            width: 50,
            height: 50,
            backgroundColor: "black",
            zIndex: 45,
          }}
        >
          <Text style={{ color: "white" }}>asdasdasd</Text>
        </TouchableOpacity> */}
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
          color: "white",
          position: "absolute",
          bottom: -10,
          left: "-10%",
          width: 150,
          zIndex: 13,
          opacity: OpacityRanking,
        }}
      >
        {profileUser3.cardRank}
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
            profileUser3?.isWinner === false
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
          width: 80,
          overflow: "hidden",
          height: 20,
          zIndex: 5,
        }}
      >
        {profileUser3?.username ? profileUser3?.username : profileUser3?.id}
      </Text>
      <Text
        style={{
          color: "white",
          position: "absolute",
          bottom: 20,
          width: 70,
          right: -50,
          zIndex: 10,
        }}
      >
        {profileUser3?.chips > 1000
          ? profileUser3?.chips / 1000 + " k"
          : profileUser3?.chips}
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
        {profileUser3?.betChips > 0 ? profileUser3?.betChips : ""}
      </Animated.Text>
    </View>
  ) : (
    <></>
  );
};
