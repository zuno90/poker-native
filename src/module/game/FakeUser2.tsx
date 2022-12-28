import { View } from "native-base";

import { useEffect, useRef, useState, useContext } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameContext } from "../../context/GameContext";
import { GetInterpolate } from "../../utils/getInterpolate";
import { gameAction, selectGame } from "./GameSlice";
import { getImage } from "./get";

export const FakeUser2 = ({
  currentPlayer,
  handleAction,
  currentChips,
  highestBet,
}) => {
  const { highBetWave } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);

  const [count, setCount] = useState(0);
  const { waveGame } = useSelector(selectGame);
  const { profileUser2 } = useSelector(selectGame);
  const { profileFake2 } = useContext(GameContext);
  const { currentBetChips } = useSelector(selectGame);
  const { countDown } = useSelector(selectGame);
  const { raiseBet } = useSelector(selectGame);
  const { randomCountDown } = useSelector(selectGame);
  const dispatch = useDispatch();
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/5♠.png") },
    { image: require("../../../assets/deckofcard/5♠.png") },
  ]);

  // getCard
  useEffect(() => {
    if (profileUser2.cards) {
      setGetCard(getImage(profileUser2.cards));
    }
  }, [waveGame]);
  //auto bet
  useEffect(() => {
    if (countDown > -1 && currentPlayer === profileUser2.id && waveGame < 6) {
      const timer = setTimeout(
        () => {
          dispatch(gameAction.updateCountdown(countDown - 1));
        },
        countDown === 8 ? 1000 : 1000
      );
      if (countDown === randomCountDown) {
        // console.log(Math.floor(Math.random() * 9), "Random");
        // handleAction(
        //   "CALL",
        //   { chips: currentBetChips - (profileUser2.betChips - highBetWave) },

        //   profileFake2,
        //   profileUser2
        // );
        profileUser2.chips === 0
          ? handleAction("CALL", { chips: 0 }, profileFake2)
          : handleAction(
              "CALL",
              {
                chips:
                  raiseBet > profileUser2.chips
                    ? profileUser2.chips
                    : currentBetChips - profileUser2.betChips + highBetWave,
              },
              profileFake2
            );
      }
    } else {
      Animated.timing(OpacityCountdown, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200,
      });
    }
  }, [countDown, currentPlayer]);

  // chip move end turn
  useEffect(() => {
    if (waveGame % 9 > 1) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(PositionVerticalTotalBet, {
            useNativeDriver: false,
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(PositionHorizontalTotalBet, {
            useNativeDriver: false,
            toValue: 0,
            duration: 300,
          }),
        ]),

        Animated.timing(OpacityTotalBetChip, {
          useNativeDriver: false,
          toValue: 0,
          duration: 300,
        }),
      ]).start();
    }

    if (waveGame % 9 == 1) {
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
    } else if (waveGame % 9 == 5) {
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
    } else if (waveGame % 9 == 6) {
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
    } else if (waveGame % 9 == 7) {
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
  }, [waveGame, currentPlayer]);

  useEffect(() => {
    if (waveGame % 9 > 0) {
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
  }, [waveGame]);

  // chip move
  useEffect(() => {
    if (waveGame % 9 > 0) {
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
    }
  }, [profileUser2.chips]);

  // chip show
  useEffect(() => {
    // if (waveGame % 8 > 0) {
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
          duration: 200,
        }),
        Animated.timing(PositionHorizontalChipBet, {
          toValue: 0,
          useNativeDriver: false,
          duration: 200,
        }),
        Animated.timing(PositionVerticalTotalBet, {
          toValue: -1,
          useNativeDriver: false,
          duration: 200,
        }),
        Animated.timing(PositionHorizontalTotalBet, {
          toValue: -1,
          useNativeDriver: false,
          duration: 200,
        }),
      ]),
      Animated.parallel([
        Animated.timing(OpacityBetChip, {
          toValue: 0,
          useNativeDriver: false,
          duration: 50,
        }),
        Animated.timing(OpacityTotalBetChip, {
          delay: 100,
          toValue: 0,
          useNativeDriver: false,
          duration: 100,
        }),
      ]),
      Animated.timing(OpacityTotalBetChip, {
        delay: 100,
        toValue: 1,
        useNativeDriver: false,
        duration: 30,
      }),

      Animated.parallel([
        Animated.timing(PositionVerticalChipBet, {
          toValue: -1,
          useNativeDriver: false,
          duration: 50,
        }),
        Animated.timing(PositionHorizontalChipBet, {
          toValue: -1,
          useNativeDriver: false,
          duration: 50,
        }),
      ]),
    ]).start();
    // }
  }, [profileUser2.betChips]);
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalChipBet = useRef(new Animated.Value(-1)).current;
  const PositionVerticalTotalBet = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalChipBet = useRef(new Animated.Value(0)).current;
  const PositionHorizontalTotalBet = useRef(new Animated.Value(-1)).current;
  const SizeCard1 = useRef(new Animated.Value(40)).current;
  const SizeCard2 = useRef(new Animated.Value(40)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const OpacityWinLose = useRef(new Animated.Value(0)).current;
  const OpacityCountdown = useRef(new Animated.Value(0)).current;
  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;
  const OpacityRanking = useRef(new Animated.Value(0)).current;

  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "30deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "-10deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityTotalBetChip = useRef(new Animated.Value(0)).current;
  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const topPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "0%",
    "0%",
    "0%",
  ]);
  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "-0%", //none
    "75%",
    "-40%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "0%",
    "0%",
    "0%",
  ]);
  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-0%", //none
    "85%",
    "-40%",
  ]);
  const bottomPercentBetChip = GetInterpolate(PositionVerticalChipBet, [
    "25%",
    "30%",
    "75%",
  ]);
  const leftPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "-50%",
    "120%",
    "380%",
  ]);
  const bottomPercentTotalBet = GetInterpolate(PositionVerticalTotalBet, [
    "40%",
    "75%",
    "0%", //none
  ]);
  const leftPercentTotalBet = GetInterpolate(PositionHorizontalTotalBet, [
    "220%",
    "380%",
    "0%", //none
  ]);
  return (
    <View
      style={{
        position: "absolute",
        bottom: "60%",
        left: "8%",
        zIndex: 4,
        opacity: profileUser2?.isFold ? 0.3 : 1,
      }}
    >
      {/* {currentPlayer === profileUser2.id && ( */}
      {/* <TouchableOpacity
        onPress={() => {
          // profileFake2.send("CALL", { chip: 5000 });
          handleAction(
            "RAISE",
            { chips: currentBetChips - profileUser2.betChips },
            profileFake2,
            profileUser2
          );
        }}
        style={{
          position: "absolute",
          top: "20%",
          width: 50,
          height: 50,
          backgroundColor: "black",
          zIndex: 20,
        }}
      >
        <Text style={{ color: "white" }}>acTion</Text>
      </TouchableOpacity> */}
      {/* )} */}

      {/* countdown */}
      <Animated.Text
        style={{
          zIndex: 6,
          fontSize: 60,
          color: "white",
          position: "absolute",
          display: "flex",
          top: -10,
          left: 10,
          opacity:
            profileUser2.chips > 0 &&
            waveGame > 0 &&
            countDown > -1 &&
            currentPlayer === profileUser2.id
              ? 1
              : 0,
        }}
      >
        {countDown}
      </Animated.Text>
      {/* Card */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: 50,
          height: 60,
          zIndex: 6,
        }}
      >
        <View style={{ position: "relative", marginLeft: 28 }}>
          {/* Close */}
          <Animated.View
            style={{
              position: "absolute",
              zIndex: 8,
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
              zIndex: 8,
              width: SizeCard1,
              height: SizeCard1,
              transform: [{ rotateZ: UnDegCard1 }],
              opacity: UnOpacityCard1,
              top: topPercentCard1,
              right: rightPercentCard1,
            }}
          >
            <Image
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
              zIndex: 8,
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
              zIndex: 8,
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
          bottom: -50,
          left: "50%",
          width: 150,
          zIndex: 13,
          opacity: OpacityRanking,
        }}
      >
        {profileUser2.cardRank}
      </Animated.Text>
      {/* Win | Lose */}
      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: 14,
          top: "-60%",
          left: "-60%",
          opacity: OpacityWinLose,
        }}
      >
        <Image
          resizeMode="contain"
          source={
            profileUser2?.isWinner === false
              ? require("../../../assets/Lose.png")
              : require("../../../assets/Win.png")
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>
      {/* profile + chipbet */}

      <View
        style={{
          width: 50,
          height: 60,
          zIndex: 5,
          position: "absolute",
        }}
      >
        {/* Avatar */}
        <Image
          source={require("../../../assets/AvatarExample.png")}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
          }}
        />
        {/* id */}
        <Text
          numberOfLines={1}
          style={{
            color: "white",
            bottom: -60,
            width: 80,
            overflow: "hidden",
            height: 20,
          }}
        >
          {profileUser2?.id ? profileUser2?.id : ""}
        </Text>
        {/* chip user */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            bottom: -20,
            left: -60,
            width: 100,
            zIndex: 10,
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/Coins.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 12,
            }}
          >
            {profileUser2 ? profileUser2.chips : "0"}
          </Text>
        </View>
        {/* chip Bet  */}
        <Animated.Image
          source={require("../../../assets/chip.png")}
          style={{
            width: 30,
            height: 30,
            bottom: bottomPercentBetChip,
            right: leftPercentBetChip,
            opacity: OpacityBetChip,
            position: "absolute",
          }}
        />
        {/* total bet */}
        <Animated.Text
          style={{
            color: "white",
            position: "absolute",
            zIndex: 4,
            bottom: bottomPercentTotalBet,
            left: leftPercentTotalBet,
            opacity: OpacityTotalBetChip,
          }}
        >
          {profileUser2?.betChips - highBetWave > 0
            ? profileUser2?.betChips - highBetWave
            : ""}
        </Animated.Text>
      </View>
    </View>
  );
};
