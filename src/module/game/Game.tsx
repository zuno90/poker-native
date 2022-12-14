import React, { useContext, useEffect, useRef, useState } from "react";

import * as Colyseus from "colyseus.js";
import { Image, View } from "native-base";
import {
  Alert,
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { GameContext } from "../../context/GameContext";
import { FakeUser1, FakeUser2, FakeUser3, FakeUser4 } from "./index";

import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  POSITION_USER_LEFT,
  POSITION_USER_TOP,
} from "../../../constant/common";
import { useAuth } from "../../context/AuthContext";
import { GetInterpolatePosition } from "../../utils/getInterpolate";
import { BankerCard } from "./BankerCard";
import { gameAction, selectGame } from "./GameSlice";
import { UserReal } from "./UserReal";

const Game = (props: any) => {
  const { myProfile } = useContext(GameContext);
  const { profileFake1 } = useContext(GameContext);
  const { profileFake2 } = useContext(GameContext);
  const { profileFake3 } = useContext(GameContext);
  const { profileFake4 } = useContext(GameContext);
  const {
    authState: { user },
    checkAuth,
  } = useAuth();
  const { height, width } = Dimensions.get("window");

  const { profileUser } = useSelector(selectGame);
  const { profileUser1 } = useSelector(selectGame);
  const { profileUser2 } = useSelector(selectGame);
  const { SSIDstartgame } = useSelector(selectGame);
  const { currentBetChips } = useSelector(selectGame);
  const { arrSeatPlayer } = useSelector(selectGame);
  const { currentPlayer } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);
  const [totalCard, setTotalCard] = useState<any>([]);
  const [totalBet, setTotalBet] = useState<number>(0);
  const [highestBet, setHighestBet] = useState<number>(100);
  const [endTurnEnoughChip, setEndTurnEnoughChip] = useState<boolean>(false);
  const [countEnoughChip, setCountEnoughChip] = useState<number>(0);
  const dispatch = useDispatch();
  const [bankerCard, setBankerCard] = useState<any>([]);
  const [countRaiseInWave, setCountRaiseInWave] = useState<number>(0);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState([]);
  const [positionTop, setPositionTop] = useState<any>([0, 30, 0]);
  const [positionLeft, setPositionLeft] = useState<any>([0, 200, 0]);
  const [playerWait, setPlayerWait] = useState([]);
  const { isRunning } = useSelector(selectGame);
  const client = new Colyseus.Client("ws://175.41.154.239");
  const a = useSelector(selectGame);
  const PositionVerticalTotalBet = useRef(new Animated.Value(0)).current;
  const PositionHorizontalTotalBet = useRef(new Animated.Value(0)).current;
  const OpacityTotalBet = useRef(new Animated.Value(1)).current;
  let arrSeatRoom = [];

  const topTotalBet = GetInterpolatePosition(
    PositionVerticalTotalBet,
    positionTop
  );

  const leftTotalBet = GetInterpolatePosition(
    PositionHorizontalTotalBet,
    positionLeft
  );

  // GLOBAL_PERFECT_ROOM_CHAT
  useEffect(() => {
    try {
      myProfile.onMessage("ROOM_CHAT", (data) => {
        console.log(data);
        if (data.message === "Tri_Dep_Trai") {
          setTimeout(() => {
            handleReady(myProfile);
          }, 5000);
        }
        if (data.message !== "END_TURN") {
          Alert.alert("End turn ma'");
          debounce(() => {
            dispatch(gameAction.updateWaveGame(waveGame + 1));
          }, 500);
          setTimeout(() => {
            dispatch(gameAction.updateCurrentPlayer(data));
          }, 1000);
        }
      });
    } catch (error) {
      console.log(error, " SSID first");
    }
  }, [SSIDstartgame, myProfile]);
  // REVERSE_SEAT
  useEffect(() => {
    let arrSeat = [1, 2, 3, 4, 5];
    try {
      myProfile.onStateChange((state) => {
        for (let i of state.players.$items) {
          if (!arrSeatRoom.includes(i[1].seat)) {
            arrSeatRoom.push(i[1].seat);
            dispatch(
              gameAction.updateArrSeatPlayer({
                seat: i[1].seat,
              })
            );
          }
          const Seat = arrSeat.filter((item) => !arrSeatRoom.includes(item));
          if (arrSeatRoom.length === state.players.$items.size) {
            if (i[1].turn === -6)
              myProfile.send("RESERVE_SEAT", { seat: Seat[0] });
          }
        }
      });
      dispatch(gameAction.updateArrSeatFiler());
      arrSeatRoom = [];
    } catch (error) {
      console.log(error, "onChange in Home");
    }
  }, [myProfile]);

  //START_GAME
  useEffect(() => {
    try {
      myProfile.onMessage("CURRENT_PLAYER", (data) => {
        // console.log(data, "CURRENT_PLAYER");
        if (data.action === "START_GAME") {
          dispatch(gameAction.updateWaveGame(-1));
        } else {
          dispatch(gameAction.updateCurrentPlayer(data));
        }
      });
    } catch (error) {
      console.log(" error catch current in userReal");
    }
  }, [myProfile]);

  useEffect(() => {
    try {
      a.Total.forEach((item) => {
        switch (item.seat) {
          case a.PositionArray:
            dispatch(gameAction.updateProfileUser(item));
            break;
          case (a.PositionArray + 1) % 5 !== 0 ? (a.PositionArray + 1) % 5 : 5:
            dispatch(gameAction.updateProfileUser1(item));
            break;
          case (a.PositionArray + 2) % 5 !== 0 ? (a.PositionArray + 2) % 5 : 5:
            dispatch(gameAction.updateProfileUser2(item));
            break;

          case (a.PositionArray + 3) % 5 !== 0 ? (a.PositionArray + 3) % 5 : 5:
            dispatch(gameAction.updateProfileUser3(item));
            break;

          case (a.PositionArray + 4) % 5 !== 0 ? (a.PositionArray + 4) % 5 : 5:
            dispatch(gameAction.updateProfileUser4(item));
            break;
        }
      });
    } catch (error) {
      console.log("error get profile for user");
    }
  }, [a.Total]);
  useEffect(() => {
    try {
      if (waveGame > 0) setTotalBet(myProfile.state.totalBet);
      if (waveGame < 2) {
        setPositionTop(["24%", "23%", "24%"]);

        setPositionLeft(["24%", "48%", "24%"]);
      }
    } catch (error) {
      console.log("error totalBet end turn");
    }
    dispatch(gameAction.updateRaiseBet(100));
    setCountEnoughChip(0);
    setRoundGame(roundGame);
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
        setEndTurnEnoughChip(false);

        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(6));
        }, 3000);
        break;
      case 6:
        dispatch(gameAction.updateCurrentBetChips(100));
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(7));
          dispatch(gameAction.updateHighBetWave(0));
        }, 2000);

        break;
      case 7:
        myProfile.send("FINISH_GAME", "");
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(9));
        }, 3000);
        break;

      case 9:
        myProfile.send("RESET_GAME", "");
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
      myProfile.onStateChange((state) => {
        for (let i of state.players.$items) {
          if (i[1].isHost) dispatch(gameAction.updateSSIDStartGame(i[0]));
          if (i[1].id === user.id) {
            dispatch(gameAction.updatePositionArray(i[1].seat));
          }
        }
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

      myProfile.onLeave((code) => {
        console.log("we left you idiot");
        props.navigation.navigate("HOME");
        dispatch(gameAction.updateSSIDStartGame(""));
      });
      return () => {
        myProfile.removeAllListeners();
      };
    } catch (error) {
      console.log(error, "Error on State Change");
    }
  }, [myProfile]);

  useEffect(() => {
    Animated.timing(OpacityTotalBet, {
      useNativeDriver: false,
      toValue: 1,
      duration: 100,
    }).start();
    if (waveGame === 6) {
      try {
        const Winner = myProfile.state.players.$items;
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
        setPositionLeft(POSITION_USER_LEFT[positionTurnPlayerWinner[0].turn]);
        setPositionTop(POSITION_USER_TOP[positionTurnPlayerWinner[0].turn]);

        Animated.sequence([
          Animated.parallel([
            Animated.timing(PositionVerticalTotalBet, {
              delay: 1500,
              useNativeDriver: false,
              toValue: 1,
              duration: 1500,
            }),
            Animated.timing(PositionHorizontalTotalBet, {
              delay: 1500,
              useNativeDriver: false,
              toValue: 1,
              duration: 1500,
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
  const handleReady = (profileStart) => {
    try {
      console.log(profileStart.sessionId, "profileStart.sessionId");
      console.log(SSIDstartgame, "SSIDstartgame");

      if (
        profileStart.sessionId === SSIDstartgame &&
        myProfile.state.onReady === false &&
        myProfile.state.players.size > 1
      ) {
        myProfile.send("START_GAME");
        // debounce(myProfile.send("START_GAME"), 500);
      }

      const object_array = myProfile.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
      dispatch(gameAction.updateRoundGame(arr));
      dispatch(gameAction.updateCountdownReal(9));
      dispatch(gameAction.updateCountdown(9));
      dispatch(gameAction.updateIsRunning(true));
    } catch (error) {
      console.log(error, "error handle ready");
    }
  };
  const handleLeaveRoom = () => {
    // dispatch(gameAction.updateChat([]));
    myProfile.leave();
    // console.log(room, "room");
    // props.navigation.navigate("HOME");
    // profileFake1.leave();
    dispatch(gameAction.updateInit());
    setRoundGame([]);
    setPlayerWait([]);
    // dispatch(gameAction.updateHighBetWave(0));
    dispatch(gameAction.updateWaveGame(-2));
    dispatch(gameAction.updateProfileUser({}));
    dispatch(gameAction.updateProfileUser1({}));
    dispatch(gameAction.updateProfileUser2({}));
    dispatch(gameAction.updateProfileUser3({}));
    dispatch(gameAction.updateProfileUser4({}));
  };
  const handlePlayerAction = (
    actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN" | "",
    Chip,
    profileSend,
    profileUser
  ) => {
    if (profileSend && profileSend !== null && waveGame > 0 && waveGame < 6) {
      if (endTurnEnoughChip) handleEndTurn(profileSend);
      else {
        profileSend.send(actionType, Chip);
        const newarr = roundgame.filter((item) => item !== roundgame[0]);
        if (
          newarr.length === 0 &&
          (actionType === "CHECK" || actionType === "CALL")
        ) {
          handleEndTurn(profileSend);
        }
        if (actionType === "FOLD") {
          dispatch(gameAction.updateRoundGame(newarr));
          setRoundGame(newarr);
          profileSend.send("CURRENT_PLAYER", {
            action: actionType,
          });
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
          profileSend.send("CURRENT_PLAYER", {
            action: actionType,
          });
        }
        if (actionType === "ALLIN") {
          setRoundGame([...newarr, ...playerWait, roundgame[0]]);
          setPlayerWait(newarr);
          dispatch(gameAction.updateCurrentBetChips(Chip.chips));
          profileSend.send("CURRENT_PLAYER", {
            action: actionType,
          });
        }
        if (actionType === "CALL" || "CHECK") {
          setPlayerWait([...playerWait, roundgame[0]]);
          setRoundGame(newarr);
          profileSend.send("CURRENT_PLAYER", {
            action: actionType,
          });
        }

        dispatch(gameAction.updateCountdown(9));
        dispatch(gameAction.updateStateClearTimeout(true));
        dispatch(
          gameAction.updateRandomCountdown(Math.floor(Math.random() * 3) + 4)
        );
      }
    }
  };
  useEffect(() => {
    try {
      if (waveGame > 0) {
        const arrFull = Array.from(
          myProfile.state.players.$items,
          ([_, value]) => {
            return value;
          }
        );
        arrFull.map((value, index) => {
          if (value.chips === 0) {
            setCountEnoughChip((countEnoughChip) => countEnoughChip + 1);
          }
          if (countEnoughChip === myProfile.state.players.$items.size - 1)
            setEndTurnEnoughChip(true);
        });
      }
    } catch (error) {
      console.log(error, "error chips");
    }
  }, [profileUser1.chips, profileUser2.chips, profileUser.chips]);

  const handleEndTurn = (profileSend) => {
    profileSend.send("ROOM_CHAT", {
      message: "END_TURN",
    });
    dispatch(gameAction.updateCurrentPlayerEndWave());
    if (myProfile) {
      const object_array = myProfile.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
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
      }, 3000);
    }
  };
  useEffect(() => {
    try {
      myProfile.send("ROOM_CHAT", {
        profile: "asdasd",
        message: "Tri_Dep_Trai",
      });

      myProfile.onMessage("FINISH_GAME", async (message) => {
        console.log(message, "mess back  finish game");
      });
      myProfile.onMessage("RESET_GAME", (message) => {
        console.log(message, "mess back  RESET_GAME game");
        setTimeout(() => {
          myProfile.send("ROOM_CHAT", {
            profile: "asdasd",
            message: "Tri_Dep_Trai",
          });
        }, 1000);
      });
    } catch (error) {
      console.log("error Finish game");
    }
  }, [myProfile]);

  // console.log(highestBet, "highestBet");
  // console.log(roundGame, "check roundGame");
  // console.log(playerWait, "playerWait");
  // console.log(highBetWave, "highBetWave");
  // console.log(current, "check current");
  // console.log(waveGame, "waveGame");

  return (
    <>
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
            // myProfile.send("START_GAME");
            // dispatch(gameAction.updateIsRunning(!isRunning));
            handleReady(myProfile);
            // myProfile.send("CURRENT_PLAYER", {
            //   action: "CALL",
            //   seat: 9,
            // });
            // profileFake2.send("START_GAME");
          }}
          style={{
            position: "absolute",
            top: "30%",
            width: 50,
            height: 50,
            backgroundColor: "red",
            zIndex: 20,
          }}
        >
          <Text style={{ color: "white" }}>End turn</Text>
        </TouchableOpacity>
        {/* Background */}
        <Image
          alt="sad"
          resizeMode="cover"
          source={require("../../../assets/BackgroundRoom.png")}
          style={{ width: width, height: height, zIndex: -3 }}
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
            zIndex: 8,
          }}
        >
          <Image
            alt="sad"
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="contain"
            source={require("../../../assets/QuitRoom.png")}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          bottom: 20,
          left: 20,
        }}
      >
        <Image
        alt='sad'
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={require("../../../assets/Chat.png")}
        />
      </TouchableOpacity> */}
        {/* Chat */}
        {/* Table */}
        <Image
          alt="sad"
          resizeMode="contain"
          source={require("../../../assets/TableRoom.png")}
          style={{
            width: "70%",
            height: "58%",
            zIndex: -1,
            position: "absolute",
          }}
        />
        {/* Host */}
        <View style={{ position: "absolute", bottom: "75%" }}>
          <Image
            alt="sad"
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
          endTurnEnoughChip={endTurnEnoughChip}
          handleAction={handlePlayerAction}
          highestBet={highestBet}
          countRaiseInWave={countRaiseInWave}
        />
        <FakeUser1
          handleAction={handlePlayerAction}
          currentChips={currentBetChips}
          handleReady={handleReady}
        />
        <FakeUser2
          handleAction={handlePlayerAction}
          handleReady={handleReady}
          currentChips={currentBetChips}
        />
        <FakeUser3 handleAction={handlePlayerAction} />
        <FakeUser4 handleAction={handlePlayerAction} />
        {/* Bet */}
      </View>
      {/* <ModalChat /> */}
    </>
  );
};

export default Game;
