import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Room } from "colyseus.js";

import { View } from "native-base";
import * as Colyseus from "colyseus.js";
import { GameContext } from "../../context/GameContext";
import { Animated, TouchableOpacity, Image, Text, Alert } from "react-native";
import { FakeUser1, FakeUser2, FakeUser3, FakeUser4 } from "./index";
import { BankerCard } from "./BankerCard";
import { Action } from "./Action";
import { useDispatch, useSelector } from "react-redux";
import { gameAction, selectGame } from "./GameSlice";
import { useAuth } from "../../context/AuthContext";
import { UserReal } from "./UserReal";
interface ROOM_CHAT {
  ROOM_CHAT: "ROOM_CHAT";
  message: string;
}
const Game = (props: any) => {
  const { room } = useContext(GameContext);
  const {
    authState: { user },
  } = useAuth();
  const { profileUser } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);
  const myroom = room as Room;
  const [totalCard, setTotalCard] = useState<any>([]);
  const [highestBet, setHighestBet] = useState<number>(0);
  const dispatch = useDispatch();
  const [bankerCard, setBankerCard] = useState<any>([]);
  let [count, setCount] = useState(1);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState(roundGame);
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
    dispatch(gameAction.updateProfileUser4(a.Total[(a.PositionArray + 4) % 5]));
  }, [a]);
  useEffect(() => {
    setRoundGame(roundGame);
  }, [waveGame]);
  useEffect(() => {
    try {
      if (room && room !== null) {
        setHighestBet(room.state.highestBet);
        let countPositionArray = -1;
        room.onStateChange((state) => {
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
    const object_array = myroom.state.players.$items;
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
    actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN" | "",
    Chip,
    profile
  ) => {
    // console.log(profile, "asdjaois");
    // profileFake1.send("CALL", { chip: 5000 });
    profile.send(actionType, Chip);
    const newarr = roundgame.filter((item) => item !== roundgame[0]);
    if (
      newarr.length === 1 &&
      (actionType === "CHECK" || actionType === "CALL")
    ) {
      actionType = "";
      handeEndTurn();
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
  const handeEndTurn = () => {
    const object_array = room.state.players.$items;
    const arr = Array.from(object_array, ([_, value]) => {
      return value.id;
    });
    setCurrent(arr[0]);
    setPlayerWait([]);

    dispatch(gameAction.updateRoundGame(arr));
    dispatch(gameAction.updateWaveGame(waveGame + 1));
  };
  // --- end of Quang code ----
  console.log(myroom, "myr");
  console.log(highestBet, "highestBetjkas");
  console.log(typeof profileUser.betChips, "betchips");
  console.log(current, "curre");
  console.log(roundgame, "round");
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
          handlePlayerAction("ALLIN", { chips: 5000 }, myroom);
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
        <Text style={{ color: "white" }}>ACtion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleReady}
        style={{
          position: "absolute",
          top: "40%",
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
      <FakeUser2 currentPlayer={current} handleAction={handlePlayerAction} />
      <FakeUser3 handleAction={handlePlayerAction} />
      {/* <FakeUser4 StateCard={count} currentPlayer={current} /> */}
      {/* Bet */}
      {current === profileUser.id && (
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
              ImageAction={require("../../../assets/Fold.png")}
              title="FOLD"
            />
            {/* Check */}
            <Action
              action={() => {
                handlePlayerAction("CHECK", { chips: 0 }, myroom);
              }}
              ImageAction={require("../../../assets/Check.png")}
              title="CHECK"
            />
            {/* Raise */}
            <Action
              action={() =>
                handlePlayerAction("RAISE", { chips: highestBet + 100 }, myroom)
              }
              ImageAction={require("../../../assets/Raise.png")}
              title="Raise"
            />
            {/* ALL In */}
            <Action
              action={() => {
                // dispatch(gameAction.updateWaveGame(waveGame + 1));
              }}
              ImageAction={require("../../../assets/Allin.png")}
              title="ALL IN"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Game;
