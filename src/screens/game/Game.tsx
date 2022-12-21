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
  const { currentBetChips } = useSelector(selectGame);
  const { highBetWave } = useSelector(selectGame);
  const { roundGame } = useSelector(selectGame);
  const myroom = room as Room;
  const [totalCard, setTotalCard] = useState<any>([]);
  const [highestBet, setHighestBet] = useState<number>(100);
  const dispatch = useDispatch();
  const { countDown } = useSelector(selectGame);
  const [bankerCard, setBankerCard] = useState<any>([]);
  const { waveGame } = useSelector(selectGame);
  const [roundgame, setRoundGame] = useState([]);
  const [current, setCurrent] = useState<any>(null);
  const [playerWait, setPlayerWait] = useState([]);
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
      case 5:
        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(6));
        }, 3000);
        break;
      case 6:
        myroom.send("FINISH_GAME", "");

        setTimeout(() => {
          dispatch(gameAction.updateWaveGame(7));
          dispatch(gameAction.updateHighBetWave(0));
        }, 3000);
        break;
      case 7:
        myroom.send("RESET_GAME", "");
        setTimeout(() => {
          dispatch(gameAction.updateIsRunning(false));
          setTimeout(() => {
            dispatch(gameAction.updateWaveGame(8));
          }, 1000);
        }, 5000);

        break;

      default:
        break;
    }
    if (profileUser.betChips > highBetWave) {
      dispatch(gameAction.updateHighBetWave(profileUser.betChips));
    }

    dispatch(gameAction.updateCurrentBetChips(profileUser.betChips));
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
          dispatch(gameAction.updateCountdownStartGame(9));
        });

        return () => {
          myroom.removeAllListeners();
        };
      } else {
        props.navigation.navigate("HOME");
      }
    } catch {
      console.log("Error");
    }
  }, [room]);
  useEffect(() => {
    // if (profileUser !== undefined) {
    //   if (profileUser.cards.length !== undefined)
    //     dispatch(gameAction.updateWaveGame(1));
    // }
    console.log(profileUser);
  }, [profileUser]);
  useEffect(() => {
    setTimeout(() => {
      handleReady();
    }, 6000);
  }, [isRunning]);
  const handleReady = async () => {
    if (myroom && myroom !== null) {
      console.log("STart game");
      myroom.send("START_GAME");

      const object_array = myroom.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
      console.log(arr, "check arr");
      dispatch(gameAction.updateRoundGame(arr));
    }
  };
  const handleLeaveRoom = () => {
    myroom.leave();
  };
  // myroom.onMessage("CONGRATULATION", (message) => {
  //   console.log(message, "mess back");
  // });
  // console.log(room.onMessageHandlers.events.CONGRATULATION, "muyrom");
  const handlePlayerAction = useCallback(
    (
      actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN" | "",
      Chip,
      profile,
      profileUser
    ) => {
      if (profile && profile !== null) {
        profile.send(actionType, Chip);

        const newarr = roundgame.filter((item) => item !== roundgame[0]);
        if (
          newarr.length === 0 &&
          (actionType === "CHECK" || actionType === "CALL")
        )
          handeEndTurn(profileUser);
        setCurrent(newarr[0]);

        if (actionType === "RAISE") {
          setHighestBet(highestBet * 2);
          setRoundGame([...newarr, ...playerWait, roundgame[0]]);
          setPlayerWait([newarr]);

          dispatch(
            gameAction.updateCurrentBetChips(currentBetChips + highestBet)
          );
        }
        if (actionType === "ALLIN") {
          setRoundGame([...newarr, ...playerWait, roundgame[0]]);
          setPlayerWait([newarr]);
          dispatch(gameAction.updateCurrentBetChips(Chip.chips));
        }
        if (actionType === "CALL" || "CHECK") {
          setPlayerWait([...playerWait, roundgame[0]]);
          setRoundGame(newarr);
        }
        dispatch(gameAction.updateCountdown(9));
        dispatch(
          gameAction.updateRandomCountdown(Math.floor(Math.random() * 7) + 1)
        );
        console.log(Chip.chips, "chip action");
      }
    },
    [current]
  );
  const handeEndTurn = (profileUserBack) => {
    // console.log(profileUserBack, "profile end turn");
    if (myroom) {
      const object_array = myroom.state.players.$items;
      const arr = Array.from(object_array, ([_, value]) => {
        return value.id;
      });
      setCurrent(arr[0]);
      setPlayerWait([]);
      dispatch(gameAction.updateRoundGame(arr));
      // dispatch(gameAction.updateWaveGame(waveGame + 1));
      dispatch(gameAction.updateWaveChipTotal(profileUserBack.betChips));
    }
  };
  useEffect(() => {
    if (myroom) {
      myroom.onMessage("FINISH_GAME", (message) => {
        console.log(message, "mess back  finish game");
      });
      myroom.onMessage("RESET_GAME", (message) => {
        console.log(message, "mess back  RESET_GAME game");
      });
    }
  }, [myroom]);
  console.log(myroom, "myroom");
  console.log(current, "current");

  // console.log(playerWait, "playerWait");

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
          // myroom.send("FINISH_GAME", "");
          handleReady();

          // dispatch(gameAction.updateCurrentBetChips(0));
          // dispatch(gameAction.updateWaveGame(0));
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
        {myroom ? (myroom.state.totalBet > 0 ? myroom.state.totalBet : "") : ""}
      </Text>
      <BankerCard ImageCard={bankerCard} />
      {/* User  */}
      <UserReal currentPlayer={current} />
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
      {current === profileUser.id &&
        waveGame % 8 < 6 &&
        profileUser.chips > 0 && (
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
                  handlePlayerAction("FOLD", { chips: 0 }, myroom, profileUser);
                }}
                ImageAction={require("../../../assets/Fold.png")}
                title="FOLD"
              />
              {/* Check */}
              <Action
                action={() => {
                  handlePlayerAction(
                    "CHECK",
                    { chips: 0 },
                    myroom,
                    profileUser
                  );
                }}
                ImageAction={require("../../../assets/Check.png")}
                title="CHECK"
              />
              {/* Raise */}
              <Action
                action={() =>
                  // handlePlayerAction(
                  //   "RAISE",
                  //   {
                  //     chips:
                  //       currentBetChips - profileUser.betChips + highestBet,
                  //   },
                  //   myroom,
                  //   profileUser
                  // )
                  handlePlayerAction(
                    "CALL",
                    {
                      chips: 100,
                    },
                    myroom,
                    profileUser
                  )
                }
                ImageAction={require("../../../assets/Raise.png")}
                title="Raise"
              />
              {/* ALL In */}
              <Action
                action={() => {
                  // dispatch(gameAction.updateWaveGame(waveGame + 1));
                  handlePlayerAction(
                    "ALLIN",
                    {
                      chips: profileUser.chips,
                    },
                    myroom,
                    profileUser
                  );
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
