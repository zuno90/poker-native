import React, { useContext, useEffect, useState, useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "react-native-dotenv";
import axios from "axios";
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
  } = useAuth();
  const { profileUser } = useSelector(selectGame);

  const { currentBetChips } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);
  const myroom = room as Room;
  const [totalCard, setTotalCard] = useState<any>([]);
  const [totalBet, setTotalBet] = useState<number>(0);
  const [countDownGlobal, setCountDownGlobal] = useState<number>(9);
  const [highestBet, setHighestBet] = useState<number>(100);
  const dispatch = useDispatch();
  const { countDown } = useSelector(selectGame);
  const [bankerCard, setBankerCard] = useState<any>([]);
  const [countRaiseInWave, setCountRaiseInWave] = useState<number>(0);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState([]);
  const [current, setCurrent] = useState<any>(null);
  const [playerWait, setPlayerWait] = useState([]);
  const { countdownReal } = useSelector(selectGame);
  const { isRunning } = useSelector(selectGame);
  const { countDownStartGame } = useSelector(selectGame);
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
    try {
      if (waveGame > 0) setTotalBet(myroom.state.totalBet);
    } catch (error) {
      console.log("error totalBet end turn");
    }
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
        }, 4000);
        break;
      case 6:
        myroom.send("FINISH_GAME", "");
        const checkAuth = async () => {
          const accessToken = await AsyncStorage.getItem("accessToken");
          if (!accessToken) return;
          try {
            const res = await axios.get(`${API_URL}/user/info`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            const { success, data } = res.data;
            if (!success) throw new Error("Bad request!");
            return {
              isAuth: true,
              user: {
                id: data._id,
                email: data.email,
                username: data.username,
                name: data.name,
                avatar: data.avatar,
                chips: data.chips,
              },
            };
          } catch (error) {}
        };
        checkAuth().then((value) => {
          console.log(value, "updated");
          dispatch(gameAction.updateCurrentBetChips(100));
          setTimeout(() => {
            dispatch(gameAction.updateWaveGame(7));
            dispatch(gameAction.updateHighBetWave(0));
          }, 2000);
        });

        break;
      case 7:
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
      }, 3000);
    }
  }, [isRunning]);

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
        gameAction.updateRandomCountdown(Math.floor(Math.random() * 7) + 1)
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
          handleReady();
          // handeEndTurn();
        }}
        style={{
          position: "absolute",
          top: "30%",
          width: 50,
          height: 50,
          backgroundColor: "black",
          zIndex: 20,
        }}
      >
        <Text style={{ color: "white" }}>ACtion</Text>
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
          top: "24%",
          color: "white",
          position: "absolute",
          fontSize: 16,
          zIndex: 6,
        }}
      >
        {totalBet > 0 && waveGame > 1 ? totalBet : ""}
      </Text>
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
      {/* <FakeUser3 handleAction={handlePlayerAction} /> */}
      {/* <FakeUser4 StateCard={count} currentPlayer={current} /> */}
      {/* Bet */}
    </View>
  );
};

export default Game;
