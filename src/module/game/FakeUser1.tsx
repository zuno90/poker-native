import { View } from "native-base";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GameContext } from "../../context/GameContext";
import { GetInterpolate } from "../../utils/getInterpolate";
import { gameAction, selectGame } from "./GameSlice";
import { getImage } from "./get";

export const FakeUser1 = ({ currentPlayer, handleAction, currentChips }) => {
  const { profileFake1 } = useContext(GameContext);

  const dispatch = useDispatch();
  const { room } = useContext(GameContext);
  const { profileUser1 } = useSelector(selectGame);
  const { currentBetChips } = useSelector(selectGame);
  const { randomCountDown } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { raiseBet } = useSelector(selectGame);

  const { countDown } = useSelector(selectGame);
  const { waveGame } = useSelector(selectGame);
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/5♠.png") },
    { image: require("../../../assets/deckofcard/5♠.png") },
  ]);

  //get Card
  useEffect(() => {
    if (profileUser1.cards) {
      setGetCard(getImage(profileUser1.cards));
    }
  }, [waveGame]);
  // Auto bet
  useEffect(() => {
    if (profileUser1.chips > 100 && waveGame < 6) {
      if (countDown > -1 && currentPlayer === profileUser1.id) {
        const timer = setTimeout(
          () => {
            dispatch(gameAction.updateCountdown(countDown - 1));
          },
          countDown === 8 ? 1000 : 1000
        );
        if (countDown === randomCountDown) {
          // console.log(Math.floor(Math.random() * 9), "Random");
          profileUser1.chips === 0
            ? handleAction("CALL", { chips: 0 }, profileFake1)
            : handleAction(
                "CALL",
                {
                  chips:
                    raiseBet > profileUser1.chips
                      ? profileUser1.chips
                      : currentBetChips - profileUser1.betChips + highBetWave,
                },
                profileFake1
              );
          clearTimeout(timer);
        }
      }
    } else if (currentPlayer === profileUser1.id) {
      setTimeout(() => {
        handleAction("CALL", { chips: 0 }, profileFake1);
      }, 2000);
    }
  }, [countDown, currentPlayer]);

  useEffect(() => {
    if (waveGame % 10 > 1) {
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
    if (waveGame % 10 == 1) {
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
    } else if (waveGame % 10 == 5) {
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
          duration: 100,
        }),
      ]).start();
    } else if (waveGame % 10 == 6) {
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
    } else if (waveGame % 10 == 7) {
      Animated.timing(OpacityRanking, {
        toValue: 0,
        useNativeDriver: false,
        duration: 100,
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

  // chip move end turn
  useEffect(() => {
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
  }, [waveGame]);

  // chip move
  useEffect(() => {
    if (waveGame % 10 > 0) {
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
  }, [profileUser1.chips]);

  // chip show
  useEffect(() => {
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
  }, [profileUser1.betChips]);
  // currentBetChips - profileUser1.betChips + highBetWave
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalChipBet = useRef(new Animated.Value(-1)).current;
  const PositionVerticalTotalBet = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalChipBet = useRef(new Animated.Value(0)).current;
  const PositionHorizontalTotalBet = useRef(new Animated.Value(-1)).current;
  const SizeCard1 = useRef(new Animated.Value(30)).current;
  const SizeCard2 = useRef(new Animated.Value(30)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityTotalBetChip = useRef(new Animated.Value(0)).current;
  const OpacityWinLose = useRef(new Animated.Value(0)).current;
  const OpacityRanking = useRef(new Animated.Value(0)).current;

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
    "0%",
    "-200%",
    "0%", // none
  ]);
  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "-300%",
    "25%",
    "-100%",
  ]);
  const topPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "0%",
    "-200%",
    "0%", //none
  ]);
  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "-0%", //none
    "35%",
    "-100%",
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
  const bottomPercentTotalBet = GetInterpolate(PositionVerticalTotalBet, [
    "110%",
    "300%",
    "0%", //none
  ]);
  const rightPercentTotalBet = GetInterpolate(PositionHorizontalTotalBet, [
    "-150%",
    "-450%",
    "0%", //none
  ]);
  return (
    <View
      style={{
        position: "absolute",
        bottom: "25%",
        left: "15%",
        zIndex: 5,
        opacity: profileUser1?.isFold ? 0.3 : 1,
      }}
    >
      {/* {currentPlayer === profileUser1.id && ( */}
      {/* <TouchableOpacity
        onPress={() => {
          handleAction(
            "FOLD",
            { chips: currentBetChips - profileUser1.betChips },
            profileFake1,
            profileUser1
          );
        }}
        style={{
          position: "absolute",
          top: "20%",
          width: 50,
          height: 50,
          backgroundColor: "transparent",
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
            profileUser1.chips > 0 &&
            waveGame > 0 &&
            countDown > -1 &&
            currentPlayer === profileUser1.id
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
          width: 60,
          height: 60,
          zIndex: 6,
        }}
      >
        <View style={{ position: "relative" }}>
          {/* Close */}
          <Animated.View
            style={{
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
              position: "absolute",
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
        {profileUser1.cardRank}
      </Animated.Text>
      {/* Win | Lose */}
      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: 14,
          top: "-50%",
          left: "-20%",
          opacity: profileUser1?.isFold ? 0 : OpacityWinLose,
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
      {/* Profile + chipbet */}
      <View
        style={{
          width: 50,
          height: 60,
          zIndex: 5,
          position: "absolute",
        }}
      >
        <Image
          source={require("../../../assets/AvatarExample.png")}
          style={{
            width: 60,
            height: 60,
            position: "absolute",
          }}
        />
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
          {profileUser1?.id ? profileUser1?.id : ""}
        </Text>
        {/* chip user */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            bottom: -40,
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
            {profileUser1 ? profileUser1.chips : "0"}
          </Text>
        </View>
        {/* chip Bet */}
        <Animated.Image
          source={require("../../../assets/chip.png")}
          style={{
            width: 30,
            height: 30,
            bottom: bottomPercentBetChip,
            right: rightPercentBetChip,
            opacity: OpacityBetChip,
            position: "absolute",
            zIndex: 8,
          }}
        />
        {/* total bet */}
        <Animated.Text
          style={{
            color: "white",
            position: "absolute",
            zIndex: 4,
            bottom: bottomPercentTotalBet,
            right: rightPercentTotalBet,
            opacity: OpacityTotalBetChip,
          }}
        >
          {profileUser1?.betChips - highBetWave > 0
            ? profileUser1?.betChips - highBetWave
            : ""}
        </Animated.Text>
      </View>
    </View>
  );
};
