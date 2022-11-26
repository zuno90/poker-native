import React, { useContext, useEffect, useRef, useState } from "react";
import { Room } from "colyseus.js";

import { View } from "native-base";
import * as Colyseus from "colyseus.js";
import { GameContext } from "../../context/GameContext";
import { Animated, TouchableOpacity, Image, Text, Alert } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
import { getImage } from "./get";
import { FakeUser1, FakeUser2, FakeUser3, FakeUser4 } from "./index";
import { BankerCard } from "./BankerCard";
import { Action } from "./Action";

const Game = (props: any) => {
  const { room, handleRoom } = useContext(GameContext);
  const [totalCard, setTotalCard] = useState<any>([]);
  const roomContext = useContext(GameContext);
  const [rooms, setRooms] = useState<Colyseus.RoomAvailable[]>([]);

  const getAvailableRooms = async () => {
    try {
      const room = await client.getAvailableRooms("desk");
      if (room) {
        setRooms(room);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [Player, setPlayer] = useState<any>([
    [
      "Bot",
      {
        id: "Bot",
      },
    ],
  ]);

  const [bankerCard, setBankerCard] = useState<any>([]);
  const myroom = room as Room;
  let [count, setCount] = useState(1);
  const client = new Colyseus.Client("ws://175.41.154.239");

  useEffect(() => {
    if (room && room !== null) {
      myroom.onStateChange((state) => {
        for (let i of state.players) {
          setPlayer([...Player, i]);
          console.log(i, "player");
        }

        for (let i of state.players.values()) {
          if (i.cards.length !== 0) {
            setTotalCard([...totalCard, i.cards]);
          }
        }
        if (state.banker5Cards) {
          setBankerCard(state.banker5Cards);
        }
      });
      myroom.onLeave((code) => {
        console.log("we left you idiot");
        handleRoom(null);
      });
      return () => {
        myroom.removeAllListeners();
      };
    } else {
      props.navigation.navigate("HOME");
    }
  }, [room]);
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
  const joinRoom = async () => {
    await getAvailableRooms();
    console.log(rooms);
    // const params = {
    //   id: "zuno-bot",
    //   isHost: false,
    //   chips: 10000,
    //   turn: this?.clients.length + 1,
    //   role: "Bot",
    // }
    // try {
    //   const room = await client.join("desk", params);

    //   if (room) {
    //     roomContext.handleRoom(room);
    //   }
    // } catch (error) {
    //   console.log("adsf", error);
    // }
  };
  const handleReady = () => {
    myroom.send("START_GAME");
  };
  const handleLeaveRoom = () => {
    myroom.leave();
    setPlayer([
      [
        "Bot",
        {
          id: "Bot",
        },
      ],
    ]);
  };

  const ImgCard1 = getImage(totalCard[0]);

  useEffect(() => {
    if (count % 6 == 1) {
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
    } else if (count % 6 == 0) {
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
  }, [count]);
  console.log(Player, "playerTotal");
  // console.log(room, "Room");
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionVerticalChipBet = useRef(new Animated.Value(-1)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalChipBet = useRef(new Animated.Value(0)).current;
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
    "-120%",
    "-360%",
  ]);
  const rightPercentBetChip = GetInterpolate(PositionHorizontalChipBet, [
    "60%",
    "-220%",
    "-220%",
  ]);
  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {/* Background */}
      <Image
        resizeMode="cover"
        source={require("../../../assets/BackgroundRoom.png")}
        style={{ width: "101%", height: "101%" }}
      />
      {/* Table */}

      <Image
        resizeMode="cover"
        source={require("../../../assets/TableRoom.png")}
        style={{
          width: "70%",
          height: "58%",
          zIndex: 2,
          position: "absolute",
        }}
      />
      {/* Host */}
      <View style={{ position: "absolute", bottom: "75%" }}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/GirlBanker.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      {/* TotalBet */}
      <Text
        style={{
          top: "25%",
          color: "white",
          position: "absolute",
          fontSize: 20,
          zIndex: 6,
        }}
      >
        70.0k
      </Text>
      <BankerCard StateCard={count} ImageCard={bankerCard} />
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
          source={ImgCard1 ? ImgCard1[0]?.image : ""}
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
          source={ImgCard1 ? ImgCard1[1]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Win | Lose */}
      {Player[1] ? (
        <Animated.View
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            zIndex: 14,
            bottom: "-5%",
            right: "50%",
            opacity: OpacityWinLose,
          }}
        >
          <Image
            resizeMode="contain"
            source={
              Player[1][1] === false
                ? require("../../../assets/Lose.png")
                : require("../../../assets/Win.png") ||
                  require("../../../assets/Lose.png")
            }
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Animated.View>
      ) : (
        <></>
      )}
      {/* profile User */}
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          right: "56%",
          backgroundColor: "white",
          width: 50,
          height: 60,
          zIndex: 5,
        }}
      >
        {/* chip Bet */}
        <Animated.Text
          style={{
            color: "white",
            position: "absolute",
            top: bottomPercentBetChip,
            right: rightPercentBetChip,
            width: 70,
            zIndex: 10,
            opacity: OpacityBetChip,
          }}
        >
          5.00k
        </Animated.Text>
        <Text
          style={{
            color: "white",
            position: "absolute",
            bottom: 0,
            left: -50,
            width: 70,
            zIndex: 10,
          }}
        >
          5.00k
        </Text>
        <Text
          style={{
            color: "white",
            position: "absolute",
            bottom: -20,
            width: 70,
          }}
        >
          UserName
        </Text>
      </View>

      <FakeUser1 StateCard={count} ImageCard={[""]} profile={Player[1]} />
      <FakeUser2 StateCard={count} ImageCard={[""]} profile={Player[1]} />
      <FakeUser3 StateCard={count} ImageCard={[""]} profile={Player[1]} />
      <FakeUser4 StateCard={count} ImageCard={[""]} profile={Player[1]} />
      {/* Card user */}
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: "-1%",
          display: "flex",
          width: "40%",
          height: "17%",
          flexDirection: "row",
        }}
      >
        <Image
          resizeMode="cover"
          source={require("../../../assets/betFrame.png")}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 6,
            position: "absolute",
          }}
        />
        <View
          style={{
            zIndex: 7,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {/* Call */}
          <Action
            ImageAction={require("../../../assets/Call.png")}
            title="CALL"
          />
          {/* Check */}
          <Action
            ImageAction={require("../../../assets/Check.png")}
            title="CHECK"
          />
          {/* FOLD */}
          <Action
            ImageAction={require("../../../assets/Fold.png")}
            title="FOLD"
          />
          {/* ALL In */}
          <Action
            ImageAction={require("../../../assets/Allin.png")}
            title="ALL IN"
          />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          left: "2%",
          bottom: "5%",
          display: "flex",
          flexDirection: "row",
          marginRight: "10%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleReady();
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/T♦.png")}
            style={{ width: 95, height: 95 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCount(count + 1);
            room.send("RAISE", 5000);
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/A♦.png")}
            style={{ width: 95, height: 95 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLeaveRoom}>
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/8♦.png")}
            style={{ width: 95, height: 95 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;
