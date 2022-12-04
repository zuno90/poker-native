import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { gameAction, selectGame } from "./GameSlice";
import { useAuth } from "../../context/AuthContext";
import { UserReal } from "./UserReal";

const Game = (props: any) => {
  const { room } = useContext(GameContext);
  const {
    authState: { user },
  } = useAuth();
  const { profileUser } = useSelector(selectGame);

  const myroom = room as Room;
  const [totalCard, setTotalCard] = useState<any>([]);
  const dispatch = useDispatch();
  const [Player, setPlayer] = useState<any>([]);
  const [bankerCard, setBankerCard] = useState<any>([]);
  let [count, setCount] = useState(1);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState(null);
  const [current, setCurrent] = useState<any>(null);
  const [playerWait, setPlayerWait] = useState([]);
  const [allowPlay, setAllowPlay] = useState<boolean>(false);
  const client = new Colyseus.Client("ws://175.41.154.239");
  const a = useSelector(selectGame);

  useEffect(() => {
    dispatch(gameAction.updateProfileUser(a.Total[a.PositionArray % 5]));
    dispatch(gameAction.updateProfileUser1(a.Total[(a.PositionArray + 1) % 5]));
    dispatch(gameAction.updateProfileUser2(a.Total[(a.PositionArray + 2) % 5]));
    dispatch(gameAction.updateProfileUser3(a.Total[(a.PositionArray + 3) % 5]));
    dispatch(
      gameAction.updateProfileUser4(a.Total[(a.PositionArray % 5) + (4 % 5)])
    );
  }, [a]);
  // console.log(a.Total);
  useEffect(() => {
    try {
      if (room && room !== null) {
        // console.log("check round game", roundgame);
        console.log("check current", current);
        // console.log("check wait", playerWait);
        if (Array.isArray(roundgame) && roundgame.length === 0) {
          handeEndTurn();
        }
        let countPositionArray = -1;
        myroom.onStateChange((state) => {
          for (let i of state.players.$items) {
            countPositionArray++;
            if (i[1].id === user.id) {
              dispatch(gameAction.updatePositionArray(countPositionArray));
            }
          }
          countPositionArray = -1;
          let Arr = Array.from(
            state.players.$items,
            ([sessionId, Value]) => Value
          );
          dispatch(gameAction.updateTotal(Arr));

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
          props.navigation.navigate("HOME");
        });

        return () => {
          myroom.removeAllListeners();
        };
      } else {
        props.navigation.navigate("HOME");
      }
      if (user.id === current) {
        setAllowPlay(true);
      } else {
        setAllowPlay(false);
      }
    } catch {
      console.log("Error");
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
  const handleReady = () => {
    myroom.send("START_GAME");
    const object_array = room.state.players.$items;
    const arr = Array.from(object_array, ([_, value]) => {
      return value.id;
    });
    setCurrent(arr[0]);
    setPlayerWait([]);
    setRoundGame(arr);
    // dispatch(gameAction.updateCurrentPlayer(arr[0]));
  };
  const handleLeaveRoom = () => {
    myroom.leave();
  };

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

  const handlePlayerAction = (
    actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN",
    Chip
  ) => {
    room.send(actionType, Chip);
    const newarr = roundgame.filter((item) => item !== roundgame[0]);
    if (
      newarr.length === 1 &&
      (actionType === "CHECK" ||
        actionType === "CALL" ||
        actionType === "ALLIN")
    ) {
      console.log("END turn");
      console.log(roundgame);
      console.log("actionType", actionType);

      dispatch(gameAction.updateWaveGame(waveGame + 1));
    }

    if (actionType === "ALLIN" || actionType === "RAISE") {
      setRoundGame([...newarr, ...playerWait, roundgame[0]]);
      setPlayerWait([]);
    } else {
      setPlayerWait([...playerWait, roundgame[0]]);
      setRoundGame(newarr);
    }

    setCurrent(newarr[0]);
    // setRoundGame(newarr);
  };
  const setPlayerAfterAction = (newValue) => {
    console.log(roundgame, "new func");
  };
  const handeEndTurn = () => {
    console.log("end turn");

    const object_array = room.state.players.$items;
    const arr = Array.from(object_array, ([_, value]) => {
      return value.id;
    });

    // viet tang turn tai day

    setCurrent(arr[0]);
    setRoundGame(arr);
    setPlayerWait([]);
  };

  // --- end of Quang code ----

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
  console.log(roundgame, "roundgame2 nè");
  // console.log(room, "Checkroom");
  // console.log(playerWait, "playerWait sau action");
  // console.log(roundgame, "round sau action");
  // console.log(current, "current sau action");
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
      <TouchableOpacity
        onPress={() => {
          handlePlayerAction("CALL", 5000);
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
        <Text style={{ color: "white" }}>Start Game</Text>
      </TouchableOpacity>
      {/* Background */}
      <Image
        resizeMode="cover"
        source={require("../../../assets/BackgroundRoom.png")}
        style={{ width: "101%", height: "101%" }}
      />
      {/* QuitRoom */}
      <TouchableOpacity
        onPress={handleLeaveRoom}
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          top: 20,
          left: 20,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={require("../../../assets/QuitRoom.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          bottom: 20,
          left: 20,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={require("../../../assets/Chat.png")}
        />
      </TouchableOpacity>
      {/* Chat */}
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
      <BankerCard ImageCard={bankerCard} />
      {/* User  */}
      <UserReal StateCard={count} handleAction={handlePlayerAction} />
      <FakeUser1 currentPlayer={current} handleAction={handlePlayerAction} />
      <FakeUser2 handleAction={handlePlayerAction} />
      <FakeUser3 handleAction={handlePlayerAction} />
      {/* <FakeUser4 StateCard={count} currentPlayer={current} /> */}
      {/* Bet */}
      {/* {current === profileUser.id && ( */}
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
            action={() => {
              room.send("FOLD");
            }}
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
            action={() => handleReady()}
            ImageAction={require("../../../assets/Fold.png")}
            title="FOLD"
          />
          {/* ALL In */}
          <Action
            action={() => {
              dispatch(gameAction.updateWaveGame(waveGame + 1));
            }}
            ImageAction={require("../../../assets/Allin.png")}
            title="ALL IN"
          />
        </View>
      </View>
      {/* )} */}
    </View>
  );
};

export default Game;
