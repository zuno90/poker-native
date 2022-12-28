import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import {
  GetInterpolate,
  GetInterpolatePosition,
} from "../../utils/getInterpolate";
import {
  POSITION_USER_LEFT,
  POSITION_USER_TOP,
} from "../../../constant/common";

interface ROOM_CHAT {
  ROOM_CHAT: "ROOM_CHAT";
  message: string;
}
const Game = (props: any) => {
  const { room } = useContext(GameContext);

  const { profileFake1 } = useSelector(selectGame);
  const { profileFake2 } = useSelector(selectGame);
  const {
    authState: { user },
    checkAuth,
  } = useAuth();
  const { profileUser } = useSelector(selectGame);
  const { currentBetChips } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);
  const myroom = room as Room;
  const [totalCard, setTotalCard] = useState<any>([]);
  const [totalBet, setTotalBet] = useState<number>(0);
  const [highestBet, setHighestBet] = useState<number>(100);
  const dispatch = useDispatch();
  const [bankerCard, setBankerCard] = useState<any>([]);
  const [countRaiseInWave, setCountRaiseInWave] = useState<number>(0);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState([]);
  const [current, setCurrent] = useState<any>(null);
  const [positionTop, setPositionTop] = useState<any>([0, 30, 0]);
  const [positionLeft, setPositionLeft] = useState<any>([0, 200, 0]);
  const [playerWait, setPlayerWait] = useState([]);
  const { isRunning } = useSelector(selectGame);
  const client = new Colyseus.Client("ws://175.41.154.239");
  const a = useSelector(selectGame);
  const PositionVerticalTotalBet = useRef(new Animated.Value(0)).current;
  const PositionHorizontalTotalBet = useRef(new Animated.Value(0)).current;
  const OpacityTotalBet = useRef(new Animated.Value(1)).current;

  const topTotalBet = GetInterpolatePosition(
    PositionVerticalTotalBet,
    positionTop
  );

  const leftTotalBet = GetInterpolatePosition(
    PositionHorizontalTotalBet,
    positionLeft
  );
  useEffect(() => {
    dispatch(gameAction.updateProfileUser(a.Total[a.PositionArray % 5]));
    dispatch(gameAction.updateProfileUser1(a.Total[(a.PositionArray + 1) % 5]));
    dispatch(gameAction.updateProfileUser2(a.Total[(a.PositionArray + 2) % 5]));
    dispatch(gameAction.updateProfileUser3(a.Total[(a.PositionArray + 3) % 5]));
    dispatch(gameAction.updateProfileUser4(a.Total[(a.PositionArray + 4) % 5]));
  }, [a]);

  useEffect(() => {
    try {
      if (waveGame > 0) setTotalBet(myroom.state.totalBet);
      if (waveGame < 2) {
        setPositionTop(["24%", "24%", "24%"]);

        setPositionLeft(["24%", "48%", "24%"]);
      }
    } catch (error) {
      console.log("error totalBet end turn");
    }
    dispatch(gameAction.updateRaiseBet(100));

    setRoundGame(roundGame);
    setCurrent(roundGame[0]);
    setPlayerWait([]);
    setHighestBet(100);
    switch (waveGame) {
      case -1:
        dispatch(gameAction.updateCurrentBetChips(100));
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(0));
        }, 3000);

        break;
      case 0:
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(1));
        }, 3000);
        break;
      case 1:
        dispatch(gameAction.updateCountdownReal(9));
        break;
      case 5:
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(6));
        }, 3000);
        break;
      case 6:
        myroom.send("FINISH_GAME", "");
        dispatch(gameAction.updateCurrentBetChips(100));
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(7));
          dispatch(gameAction.updateHighBetWave(0));
        }, 3000);

        break;
      case 7:
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(9));
        }, 6000);
        break;

      case 9:
        myroom.send("RESET_GAME", "");
        setTotalBet(0);
        setTimeout(() => {
          dispatch(gameAction.updateIsRunning(false));
        }, 3000);

        break;
      default:
        break;
    }
  }, [waveGame]);
  useEffect(() => {
    try {
      if (room && room !== null) {
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
          dispatch(gameAction.updateWaveGame(-2));
          setRoundGame([]);
          setCurrent([]);
          setPlayerWait([]);
          dispatch(gameAction.updateHighBetWave(0));
        });
        profileFake1.onLeave((code) => {});
        profileFake2.onLeave((code) => {});

        return () => {
          myroom.removeAllListeners();
          profileFake1.removeAllListeners();
          profileFake2.removeAllListeners();
        };
      } else {
        props.navigation.navigate("HOME");
      }
    } catch {
      console.log("Error");
    }
  }, [room]);

  useEffect(() => {
    if (isRunning === false) {
      setTimeout(() => {
        handleReady();
      }, 5000);
    }
  }, [isRunning]);
  //Animation for totalBet
  useEffect(() => {
    Animated.timing(OpacityTotalBet, {
      useNativeDriver: false,
      toValue: 1,
      duration: 100,
    }).start();
    if (waveGame === 7) {
      try {
        const Winner = myroom.state.players.$items;
        const arr2 = Array.from(Winner, ([_, value]) => {
          return value;
        });
        const arr = Array.from(Winner, ([_, value]) => {
          if (value.isFold === false && value.isWinner === true)
            return value.id;
        });
        const filterWiner = arr.filter((value) => !!value);
        const positionTurnPlayerWinner = arr2.filter((value) => {
          if (value.id === filterWiner[0]) return value;
        });
        // console.log(POSITION_USER_TOP, "posiCONSTANT");
        // console.log(positionTurnPlayerWinner, "posiCONSTANT");
        setPositionLeft(POSITION_USER_LEFT[positionTurnPlayerWinner[0].turn]);
        setPositionTop(POSITION_USER_TOP[positionTurnPlayerWinner[0].turn]);

        Animated.sequence([
          Animated.parallel([
            Animated.timing(PositionVerticalTotalBet, {
              useNativeDriver: false,
              toValue: 1,
              duration: 2000,
            }),
            Animated.timing(PositionHorizontalTotalBet, {
              useNativeDriver: false,
              toValue: 1,
              duration: 2000,
            }),
          ]),
          Animated.timing(OpacityTotalBet, {
            useNativeDriver: false,
            toValue: 0,
            duration: 100,
          }),
          Animated.parallel([
            Animated.timing(PositionVerticalTotalBet, {
              useNativeDriver: false,
              toValue: 0,
              duration: 100,
            }),
            Animated.timing(PositionHorizontalTotalBet, {
              useNativeDriver: false,
              toValue: 0,
              duration: 100,
            }),
          ]),
        ]).start();
      } catch (error) {
        console.log(error, "askldj");
      }
    }
  }, [waveGame]);

  const handleReady = () => {
    if (myroom && myroom !== null) {
      console.log("STart game");
      myroom.send("START_GAME");

      const object_array = myroom.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
      dispatch(gameAction.updateRoundGame(arr));
      dispatch(gameAction.updateWaveGame(-1));
      dispatch(gameAction.updateCountdownReal(9));

      dispatch(gameAction.updateIsRunning(true));
    }
  };
  const handleLeaveRoom = () => {
    myroom.leave();

    // profileFake1.leave();
    // profileFake2.leave();
  };
  // myroom.onMessage("CONGRATULATION", (message) => {
  //   console.log(message, "mess back");
  // });
  // console.log(room.onMessageHandlers.events.CONGRATULATION, "muyrom");

  const handlePlayerAction = (
    actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN" | "",
    Chip,
    profile
  ) => {
    // console.log(Chip, "chip bet");
    if (profile && profile !== null && waveGame > 0 && waveGame < 6) {
      profile.send(actionType, Chip);
      const newarr = roundgame.filter((item) => item !== roundgame[0]);
      if (
        newarr.length === 0 &&
        (actionType === "CHECK" || actionType === "CALL")
      ) {
        handeEndTurn();
      }
      if (actionType === "FOLD") {
        dispatch(gameAction.updateRoundGame(newarr));
        setRoundGame(newarr);
      }
      if (actionType === "RAISE") {
        if (countRaiseInWave > 0) {
          setHighestBet(highestBet * 2);
        }
        setCountRaiseInWave(countRaiseInWave + 1);
        setRoundGame([...newarr, ...playerWait, roundgame[0]]);
        setPlayerWait(newarr);
        dispatch(
          gameAction.updateCurrentBetChips(currentBetChips + Chip.chips)
        );
      }
      if (actionType === "ALLIN") {
        setRoundGame([...newarr, ...playerWait, roundgame[0]]);
        setPlayerWait(newarr);
        dispatch(gameAction.updateCurrentBetChips(Chip.chips));
      }
      if (actionType === "CALL" || "CHECK") {
        setPlayerWait([...playerWait, roundgame[0]]);
        setRoundGame(newarr);
      }

      dispatch(gameAction.updateCountdown(9));
      dispatch(gameAction.updateStateClearTimeout(true));
      dispatch(
        gameAction.updateRandomCountdown(Math.floor(Math.random() * 3) + 4)
      );
      setCurrent(newarr[0]);
    }
  };

  const handeEndTurn = () => {
    console.log("end turn");
    if (myroom) {
      const object_array = myroom.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
      setCurrent(arr[0]);
      setPlayerWait([]);

      setCountRaiseInWave(0);
      dispatch(gameAction.updateHighBetWave(profileUser.betChips));
      dispatch(gameAction.updateCurrentBetChips(0));
      dispatch(gameAction.updateRoundGame(arr));
      if (profileUser.isFold) dispatch(gameAction.updateCountdownReal(-2));
      else dispatch(gameAction.updateCountdownReal(9));

      const timeoutEndTurn = setTimeout(() => {
        dispatch(gameAction.updateWaveGame(waveGame + 1));
        return clearTimeout(timeoutEndTurn);
      }, 1000);
    }
  };
  useEffect(() => {
    try {
      myroom.onMessage("FINISH_GAME", (message) => {
        console.log(message, "mess back  finish game");
      });
      myroom.onMessage("RESET_GAME", (message) => {
        console.log(message, "mess back  RESET_GAME game");
      });
    } catch (error) {
      console.log("error Finish game");
    }
  }, [myroom]);

  // console.log(myroom);
  // console.log(isRunning, "isRunning");
  // console.log(highestBet, "highestBet");
  // console.log(roundGame, "check roundGame");
  // console.log(playerWait, "playerWait");
  // console.log(highBetWave, "highBetWave");
  // console.log(current, "check current");
  // console.log(waveGame, "waveGame");

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
      {/* <TouchableOpacity
        onPress={() => {
          handeEndTurn();
        }}
        style={{
          position: "absolute",
          top: "30%",
          width: 50,
          height: 50,

          zIndex: 20,
        }}
      >
        <Text style={{ color: "white" }}>End turn</Text>
      </TouchableOpacity> */}
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
        resizeMode="contain"
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
      <Animated.Text
        style={{
          top: topTotalBet,
          left: leftTotalBet,
          color: "white",
          position: "absolute",
          fontSize: 16, // 16
          // backgroundColor: "yellow",
          zIndex: 6,
          opacity: OpacityTotalBet,
        }}
      >
        {totalBet > 0 && waveGame > 1
          ? waveGame === 7
            ? `+ ${totalBet}`
            : totalBet
          : ""}
      </Animated.Text>
      <BankerCard ImageCard={bankerCard} />
      {/* User  */}
      <UserReal
        currentPlayer={current}
        handleAction={handlePlayerAction}
        highestBet={highestBet}
        countRaiseInWave={countRaiseInWave}
      />
      <FakeUser1
        currentPlayer={current}
        handleAction={handlePlayerAction}
        currentChips={currentBetChips}
      />
      <FakeUser2
        highestBet={highestBet}
        currentPlayer={current}
        handleAction={handlePlayerAction}
        currentChips={currentBetChips}
      />
      {/* <FakeUser3 handleAction={handlePlayerAction} />
      <FakeUser4 handleAction={handlePlayerAction} /> */}
      {/* Bet */}
    </View>
  );
};

export default Game;
