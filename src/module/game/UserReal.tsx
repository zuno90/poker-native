import { Room } from "colyseus.js";
import { Flex, View } from "native-base";

import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { GameContext } from "../../context/GameContext";
import { GetInterpolate } from "../../utils/getInterpolate";
import { Action } from "./Action";
import { gameAction, selectGame } from "./GameSlice";
import { getImage } from "./get";

export const UserReal = ({ currentPlayer }) => {
  const dispatch = useDispatch();
  const { profileUser } = useSelector(selectGame);
  const { waveGame } = useSelector(selectGame);
  const { currentBetChips } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { isRunning } = useSelector(selectGame);

  const handleReady = () => {
    myroom.send("START_GAME");
  };
  const handleLeaveRoom = () => {
    myroom.leave();
  };

  const { room } = useContext(GameContext);
  const {
    authState: { user },
  } = useAuth();
  const myroom = room as Room;
  const [getCard, setGetCard] = useState([
    { image: require("../../../assets/deckofcard/5♠.png") },
    { image: require("../../../assets/deckofcard/5♠.png") },
  ]);
  useEffect(() => {
    if (profileUser.cards) {
      setGetCard(getImage(profileUser.cards));
    }
  }, [waveGame, isRunning, currentPlayer]);
  useEffect(() => {
    if (waveGame % 8 > 1) {
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
    if (waveGame % 8 == 1) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              delay: 700,
              useNativeDriver: false,
              toValue: 90,
              duration: 300,
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              delay: 700,

              toValue: 1,
              duration: 300,
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              delay: 700,

              toValue: 1,
              duration: 300,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 0,
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
              toValue: 90,
              duration: 300,
            }),
            Animated.timing(PositionVerticalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300,
            }),

            Animated.timing(PositionHorizontalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400,
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 0,
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
    } else if (waveGame % 8 == 5) {
      Animated.timing(OpacityRanking, {
        toValue: 1,
        useNativeDriver: false,
        duration: 300,
      }).start();
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
          toValue: 10,
          duration: 300,
        }).start();
      Animated.timing(SizeCard2, {
        useNativeDriver: false,
        toValue: 10,
        duration: 300,
      }).start();
      Animated.timing(PositionVerticalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(PositionHorizontalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();

      Animated.timing(PositionVerticalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();

      Animated.timing(PositionHorizontalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(RotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(UnRotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 400,
      }).start();
      Animated.timing(RotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(UnRotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 400,
      }).start();
      Animated.timing(Opacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(UnOpacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(Opacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(UnOpacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300,
      }).start();
    }
  }, [waveGame]);

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
  }, [profileUser.betChips]);
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalChipBet = useRef(new Animated.Value(-1)).current;
  const PositionVerticalTotalBet = useRef(new Animated.Value(-1)).current;
  const PositionVerticalRanking = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalChipBet = useRef(new Animated.Value(0)).current;
  const PositionHorizontalTotalBet = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalRanking = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(35)).current;
  const SizeCard2 = useRef(new Animated.Value(35)).current;
  const RotateCard1 = useRef(new Animated.Value(0)).current;
  const RotateCard2 = useRef(new Animated.Value(0)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const OpacityWinLose = useRef(new Animated.Value(0)).current;
  const OpacityBetChip = useRef(new Animated.Value(0)).current;
  const OpacityTotalBetChip = useRef(new Animated.Value(0)).current;
  const OpacityRanking = useRef(new Animated.Value(0)).current;
  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;

  const bottomPercentCard1 = GetInterpolate(PositionVerticalCard1, [
    "5%",
    "68%",
    "5%",
  ]);

  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, [
    "5%",
    "48%",
    "42%",
  ]);
  const bottomPercentCard2 = GetInterpolate(PositionVerticalCard2, [
    "5%",
    "68%",
    "8%",
  ]);

  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, [
    "5%",
    "48%",
    "37%",
  ]);
  const bottomPercentRanking = GetInterpolate(PositionVerticalRanking, [
    "5%",
    "68%",
    "8%",
  ]);

  const rightPercentRanking = GetInterpolate(PositionHorizontalRanking, [
    "5%",
    "48%",
    "37%",
  ]);
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "180deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "180deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  const bottomPercentBetChip = GetInterpolate(PositionVerticalChipBet, [
    "70%",
    "-100%",
    "-360%",
  ]);
  const rightPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "120%",
    "-120%",
    "-220%",
  ]);
  const bottomPercentTotalBet = GetInterpolate(PositionVerticalTotalBet, [
    "-120%",
    "-360%",
    "-360%",
  ]);
  const rightPercentTotalBet = GetInterpolate(PositionHorizontalTotalBet, [
    "-220%",
    "-220%",
    "-220%",
  ]);
  // console.log(rightPercentBetChip, "bottom");
  return (
    <View
      style={{
        position: "relative",
        left: "50%",
        bottom: "10%",
      }}
    >
      {/* User */}

      {/* Card1 */}
      {/* Close */}
      <Animated.View
        style={{
          zIndex: 2,
          width: SizeCard1,
          height: SizeCard1,
          transform: [{ rotateY: DegCard1 }],
          opacity: OpacityCard1,
          position: "absolute",
          bottom: bottomPercentCard1,
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
          position: "absolute",
          zIndex: 2,
          width: 90,
          height: 90,
          transform: [{ rotateY: UnDegCard1 }, { rotateZ: "-5deg" }],
          opacity: UnOpacityCard1,
          bottom: bottomPercentCard1,
          right: rightPercentCard1,
        }}
      >
        <Image
          resizeMode="contain"
          source={getCard ? getCard[1]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      {/* Card2 */}
      {/* Close Card2 */}
      <Animated.View
        style={{
          width: SizeCard2,
          height: SizeCard2,
          transform: [{ rotateY: DegCard2 }, { rotateZ: "-10deg" }],
          opacity: OpacityCard2,
          position: "absolute",
          bottom: bottomPercentCard2,
          right: rightPercentCard2,
          zIndex: 10,
          // backgroundColor: "white",
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
          position: "absolute",
          zIndex: 2,
          width: 90,
          height: 90,
          transform: [{ rotateY: UnDegCard2 }, { rotateZ: "10deg" }],
          opacity: UnOpacityCard2,
          bottom: bottomPercentCard2,
          right: rightPercentCard2,
        }}
      >
        <Image
          resizeMode="contain"
          source={getCard ? getCard[0]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Ranking */}
      <Animated.Text
        style={{
          fontWeight: "500",
          color: "white",
          position: "absolute",
          bottom: -20,
          left: "-48%",
          width: 150,
          zIndex: 13,
          opacity: OpacityRanking,
        }}
      >
        {profileUser.cardRank}
      </Animated.Text>
      {/* Win | Lose */}

      <Animated.View
        style={{
          position: "absolute",
          width: 150,
          height: 150,
          zIndex: 14,
          bottom: -50,
          right: "45%",
          opacity: OpacityWinLose,
        }}
      >
        <Image
          resizeMode="contain"
          source={
            profileUser.isWinner === false
              ? require("../../../assets/Lose.png")
              : require("../../../assets/Win.png")
          }
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>

      {/* profile User */}
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          right: "56%",
          width: 50,
          height: 60,
          zIndex: 5,
        }}
      >
        <Image
          source={require("../../../assets/AvatarExample.png")}
          style={{
            width: 60,
            height: 60,
          }}
        />
        {/* chip Bet */}
        <Animated.Image
          source={require("../../../assets/chip.png")}
          style={{
            width: 20,
            height: 20,
            top: bottomPercentBetChip,
            right: rightPercentBetChip,
            opacity: OpacityBetChip,
            position: "absolute",
          }}
        />
        {/* total bet */}
        <Animated.Text
          style={{
            color: "white",
            position: "absolute",
            top: bottomPercentTotalBet,
            right: rightPercentTotalBet,
            width: 70,
            zIndex: 10,
            opacity: OpacityTotalBetChip,
          }}
        >
          {profileUser
            ? profileUser.betChips - highBetWave === 0
              ? ""
              : profileUser.betChips - highBetWave
            : ""}
        </Animated.Text>
        {/* Chip user */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            bottom: 20,
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
            {profileUser ? profileUser.chips : "0"}
          </Text>
        </View>

        {/* Profile */}
        <Text
          style={{
            color: "white",
            position: "absolute",
            bottom: -20,
            width: 70,
            overflow: "hidden",
            height: 20,
          }}
        >
          {profileUser ? profileUser.id : "User"}
        </Text>
      </View>
    </View>
  );
};
