import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Room } from "colyseus.js";

import { View } from "native-base";

import { GameContext } from "../../context/GameContext";
import { Animated, TouchableOpacity, Image, Text, Alert } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
import { getImage } from "./get";
import { FakeUser1, FakeUser2, FakeUser3, FakeUser4 } from "./index";
import { BankerCard } from "./BankerCard";
import { Action } from "./Action";
import { useAuth } from "../../context/AuthContext";

const Game = (props: any) => {
  const { room, handleRoom } = useContext(GameContext);
  const [totalCard, setTotalCard] = useState<any>([]);
  const [bankerCard, setBankerCard] = useState<any>([]);
  const myroom = room as Room;
  let [count, setCount] = useState(0);
  useEffect(() => {
    if (room && room !== null) {
      myroom.onStateChange((state) => {
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
        // props.navigation.navigate("HOME");
      });
      return () => {
        myroom.removeAllListeners();
      };
    } else {
      props.navigation.navigate("HOME");
    }
  }, [room]);

  const handleReady = async () => {
    myroom.send("START_GAME");

    const object_array = room.state.players.$items;
    const arr = Array.from(object_array, ([_, value]) => {
      return value.id;
    });
    // const newarr = arr.map((item) => item);
    // const formatarr = newarr.shift();

    // console.log("check ob arr", object_array);

    // console.log("check arnoamal", arr);

    // console.log(
    //   "cheafdasf",
    //   arr.filter((item) => item !== arr[0])
    // );

    setCurrent(arr[0]);
    setPlayerWait([]);
    // setRoundGame(arr.filter((item) => item !== arr[0]));
    setRoundGame(arr);
  };

  const handleLeaveRoom = () => {
    myroom.leave();
  };

  const ImgCard1 = getImage(totalCard[0]);
  // console.log(room);

  useEffect(() => {
    if (count % 6 == 1) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              delay: 700,
              useNativeDriver: false,
              toValue: 90,
              duration: 300
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              delay: 700,

              toValue: 1,
              duration: 300
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              delay: 700,

              toValue: 1,
              duration: 300
            })
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 0,
              duration: 400
            }),
            Animated.timing(UnOpacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            })
          ])
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 90,
              duration: 300
            }),
            Animated.timing(PositionVerticalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300
            }),

            Animated.timing(PositionHorizontalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300
            })
          ]),
          Animated.parallel([
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 0,
              duration: 400
            }),
            Animated.timing(UnOpacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 400
            })
          ])
        ])
      ]).start();
    } else if (count % 6 == 0) {
      Animated.timing(SizeCard1, {
        useNativeDriver: false,
        toValue: 10,
        duration: 300
      }).start();
      Animated.timing(SizeCard2, {
        useNativeDriver: false,
        toValue: 10,
        duration: 300
      }).start();
      Animated.timing(PositionVerticalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(PositionHorizontalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();

      Animated.timing(PositionVerticalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();

      Animated.timing(PositionHorizontalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(RotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(UnRotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 400
      }).start();
      Animated.timing(RotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(UnRotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 400
      }).start();
      Animated.timing(Opacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(UnOpacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(Opacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(UnOpacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
    }
  }, [count]);

  // console.log("kiem tra state rooom", room);
  // console.log("kiem tra props", props);

  // --- start of Quang code ----

  const {
    authState: { user }
  } = useAuth();

  const [roundgame, setRoundGame] = useState(null);
  const [current, setCurrent] = useState<any>(null);
  const [playerWait, setPlayerWait] = useState([]);
  const [allowPlay, setAllowPlay] = useState<boolean>(false);
  // const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (room && room !== null) {
      console.log("check round game", roundgame);
      console.log("check current", current);
      console.log("check wait", playerWait);

      if (Array.isArray(roundgame) && roundgame.length === 0) {
        handeEndTurn();
      }

      myroom.onStateChange((state) => {
        // console.log("hello", state);
        // if (roundgame !== null && roundgame.length === 0) {
        // }
        // console.log("this is state", state);
        // const arr = Array.from(state.players.$items, ([_, value]) => {
        //   return value;
        // });
        // console.log("check value of state", arr);
        // console.log("check statet", (state.players.$items as Map<any,any>).);
        // for (let i of state.players.values()) {
        //   if (i.cards.length !== 0) {
        //     setTotalCard([...totalCard, i.cards]);
        //   }
        // }
        // if (state.banker5Cards) {
        //   setBankerCard(state.banker5Cards);
        // }
      });

      myroom.onLeave((code) => {
        console.log("we left you idiot");
        handleRoom(null);
        // props.navigation.navigate("HOME");
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
  }, [room, roundgame, playerWait, allowPlay, current]);

  const handlePlayerAction = (actionType: "CALL" | "FOLD" | "RAISE" | "CHECK" | "ALLIN") => {
    const newarr = roundgame.filter((item) => item !== roundgame[0]);

    console.log("kiem tra round game action", newarr);

    // const formatarr = newarr.shift();

    if (actionType === "ALLIN" || actionType === "RAISE") {
      setRoundGame([...newarr, ...playerWait]);
    }

    setPlayerWait(roundgame[0]);
    setCurrent(newarr[0]);
    setRoundGame(newarr);

    // setPlayerWait([...playerWait, user.id]);
    // setRoundGame(newarr);

    // if (condition) {
    // }
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
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(35)).current;
  const SizeCard2 = useRef(new Animated.Value(35)).current;
  const RotateCard1 = useRef(new Animated.Value(0)).current;
  const RotateCard2 = useRef(new Animated.Value(0)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(0)).current;
  const Opacity2 = useRef(new Animated.Value(0)).current;
  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;

  const bottomPercentCard1 = GetInterpolate(PositionVerticalCard1, ["5%", "68%", "5%"]);

  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, ["5%", "48%", "42%"]);
  const bottomPercentCard2 = GetInterpolate(PositionVerticalCard2, ["5%", "68%", "8%"]);

  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, ["5%", "48%", "37%"]);
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "180deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "180deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  // console.log(bottomPercentCard2, "%");
  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
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
          position: "absolute"
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
          zIndex: 6
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
          right: rightPercentCard1
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
          right: rightPercentCard1
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
          zIndex: 10
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
          right: rightPercentCard2
        }}
      >
        <Image
          resizeMode="contain"
          source={ImgCard1 ? ImgCard1[1]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      {/* profile User */}
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          right: "56%",
          backgroundColor: "white",
          width: 50,
          height: 60,
          zIndex: 5
          // display: "flex",
          // justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            position: "absolute",
            top: -60,
            right: -100,
            width: 70,
            zIndex: 10
          }}
        >
          5.00k
        </Text>
        <Text
          style={{
            color: "white",
            position: "absolute",
            bottom: 0,
            left: -50,
            width: 70,
            zIndex: 10
          }}
        >
          5.00k
        </Text>
        <Text
          style={{
            color: "white",
            position: "absolute",
            bottom: -20,
            width: 70
          }}
        >
          UserName
        </Text>
      </View>

      <FakeUser1 StateCard={count} ImageCard={[""]} />
      <FakeUser2 StateCard={count} ImageCard={[""]} />
      <FakeUser3 StateCard={count} ImageCard={[""]} />
      <FakeUser4 StateCard={count} ImageCard={[""]} />
      {/* Card user */}
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: "-1%",
          display: "flex",
          width: "40%",
          height: "17%",
          flexDirection: "row"
        }}
      >
        <Image
          resizeMode="cover"
          source={require("../../../assets/betFrame.png")}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 6,
            position: "absolute"
          }}
        />
        <View
          style={{
            zIndex: 7,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          {/* Call */}
          <Action action={handlePlayerAction} ImageAction={require("../../../assets/Call.png")} title="CALL" />
          {/* Check */}
          <Action ImageAction={require("../../../assets/Check.png")} title="CHECK" />
          {/* FOLD */}
          <Action ImageAction={require("../../../assets/Fold.png")} title="FOLD" />
          {/* ALL In */}
          <Action ImageAction={require("../../../assets/Allin.png")} title="ALL IN" />
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          left: "2%",
          bottom: "5%",
          display: "flex",
          flexDirection: "row",
          marginRight: "10%"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleReady();
          }}
        >
          <Text>start game</Text>
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
        <TouchableOpacity
          onPress={() => {
            handleLeaveRoom();
          }}
        >
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
