import React, { useContext, useEffect, useRef, useState } from "react";
import { Room } from "colyseus.js";

import { Text, View, Button } from "native-base";

import { GameContext } from "../../context/GameContext";
import { Alert, Animated, TouchableOpacity, Image } from "react-native";
import { GetInterpolate } from "../../utils/getInterpolate";
import { getImage } from "./get";
import { FakeUser1, FakeUser2, FakeUser3, FakeUser4 } from "./index";
import { BankerCard } from "./BankerCard";

const Game = (props: any) => {
  const { room, handleRoom } = useContext(GameContext);
  const [Card, setCard] = useState(["K♥"]);
  const [Card2, setCard2] = useState(["2♥"]);
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
        // console.log(state, "state");
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

  const handleReady = () => {
    myroom.send("START_GAME");
  };

  const handleLeaveRoom = () => {
    myroom.leave();
  };

  const ImgCard1 = getImage(totalCard[0]);
  const PositionVerticalCard1 = useRef(new Animated.Value(0)).current;
  const PositionVerticalCard2 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard1 = useRef(new Animated.Value(0)).current;
  const PositionHorizontalCard2 = useRef(new Animated.Value(0)).current;
  const SizeCard1 = useRef(new Animated.Value(75)).current;
  const SizeCard2 = useRef(new Animated.Value(75)).current;
  const RotateCard1 = useRef(new Animated.Value(180)).current;
  const RotateCard2 = useRef(new Animated.Value(180)).current;
  const UnRotateCard1 = useRef(new Animated.Value(0)).current;
  const UnRotateCard2 = useRef(new Animated.Value(0)).current;
  const Opacity1 = useRef(new Animated.Value(1)).current;
  const Opacity2 = useRef(new Animated.Value(1)).current;
  const UnOpacity1 = useRef(new Animated.Value(0)).current;
  const UnOpacity2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (count % 6 == 1) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              useNativeDriver: false,
              toValue: 100,
              duration: 300
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 300
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
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
              toValue: 100,
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
        toValue: 75,
        duration: 300
      }).start();
      Animated.timing(SizeCard2, {
        useNativeDriver: false,
        toValue: 75,
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
        toValue: 1,
        duration: 300
      }).start();
      Animated.timing(UnOpacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
      Animated.timing(Opacity2, {
        useNativeDriver: false,
        toValue: 1,
        duration: 300
      }).start();
      Animated.timing(UnOpacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 300
      }).start();
    }
  }, [count]);

  const bottomPercentCard1 = GetInterpolate(PositionVerticalCard1, ["5%", "75%", "5%"]);

  const rightPercentCard1 = GetInterpolate(PositionHorizontalCard1, ["5%", "46%", "50%"]);
  const bottomPercentCard2 = GetInterpolate(PositionVerticalCard2, ["5%", "75%", "5%"]);

  const rightPercentCard2 = GetInterpolate(PositionHorizontalCard2, ["5%", "46%", "38%"]);
  const DegCard2 = GetInterpolate(RotateCard2, ["0deg", "0deg", "180deg"]);

  const DegCard1 = GetInterpolate(RotateCard1, ["0deg", "0deg", "180deg"]);
  const UnDegCard1 = GetInterpolate(UnRotateCard1, ["0deg", "-180deg", "0deg"]);
  const UnDegCard2 = GetInterpolate(UnRotateCard2, ["0deg", "-180deg", "0deg"]);

  const OpacityCard1 = GetInterpolate(Opacity1, [0, 0, 1]);
  const OpacityCard2 = GetInterpolate(Opacity2, [0, 0, 1]);

  const UnOpacityCard1 = GetInterpolate(UnOpacity1, [0, 0, 1]);
  const UnOpacityCard2 = GetInterpolate(UnOpacity2, [0, 0, 1]);
  console.log(room, "state");

  return (
    <View
      style={{
        position: "relative",
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center",
        flex: 1
      }}
    >
      <Image
        resizeMode="cover"
        source={require("../../../assets/BackgroundRoom.png")}
        style={{ width: "101%", height: "101%" }}
      />
      {/* Host */}
      <View style={{ position: "absolute", right: "46%", bottom: "75%" }}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: 75, height: 75 }}
        />
      </View>
      <BankerCard StateCard={count} ImageCard={bankerCard} />
      {/* User */}
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: bottomPercentCard1,
          right: rightPercentCard1,
          zIndex: 2,
          width: SizeCard1,
          height: SizeCard1,
          transform: [{ rotateY: DegCard1 }],
          opacity: OpacityCard1
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
          bottom: "5%",
          right: "50%",
          zIndex: 2,
          width: 100,
          height: 100,
          transform: [{ rotateY: UnDegCard1 }],
          opacity: UnOpacityCard1
        }}
      >
        <Image
          resizeMode="contain"
          source={ImgCard1 ? ImgCard1[0]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Close Card2 */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: bottomPercentCard2,
          right: rightPercentCard2,
          zIndex: 2,
          width: SizeCard2,
          height: SizeCard2,
          transform: [{ rotateY: DegCard2 }],
          opacity: OpacityCard2
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
          bottom: "5%",
          right: "38%",
          zIndex: 2,
          width: 100,
          height: 100,
          transform: [{ rotateY: UnDegCard2 }],
          opacity: UnOpacityCard2
        }}
      >
        <Image
          resizeMode="contain"
          source={ImgCard1 ? ImgCard1[1]?.image : ""}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      <FakeUser1 StateCard={count} ImageCard={[""]} />
      <FakeUser2 StateCard={count} ImageCard={[""]} />
      <FakeUser3 StateCard={count} ImageCard={[""]} />
      <FakeUser4 StateCard={count} ImageCard={[""]} />
      {/* Card user */}
      <View
        style={{
          position: "absolute",
          right: "0%",
          bottom: "0%",
          display: "flex",
          // flexDirection: "",
          justifyContent: "space-between",
          width: "35%",
          height: "25%"
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          {/* Raise */}
          <TouchableOpacity>
            {/* <Image
            source={require("../../../assets/bg.png")}
            
          /> */}
            <Text
              style={{
                textAlign: "center",

                backgroundColor: "red",
                height: 40,
                width: 90,
                marginRight: "2%"
              }}
            >
              Raise
            </Text>
          </TouchableOpacity>
          {/* Call */}
          <TouchableOpacity>
            {/* <Image
            source={require("../../../assets/bg.png")}
            
          /> */}

            <Text
              style={{
                backgroundColor: "red",
                height: 40,
                width: 90
              }}
            >
              Call
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // width: "130%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          {/* Fold */}
          <TouchableOpacity>
            {/* <Image
            source={require("../../../assets/bg.png")}
            
          /> */}
            <Text
              style={{
                backgroundColor: "red",
                height: 40,
                width: 90
              }}
            >
              Fold
            </Text>
          </TouchableOpacity>
          {/* Check */}
          <TouchableOpacity>
            {/* <Image
            source={require("../../../assets/bg.png")}
            
          /> */}
            <Text
              style={{
                backgroundColor: "red",
                height: 40,
                width: 90
              }}
            >
              Check
            </Text>
          </TouchableOpacity>
          {/* All in */}
          <TouchableOpacity>
            {/* <Image
            source={require("../../../assets/bg.png")}
            
          /> */}
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "red",
                height: 40,
                width: 90
              }}
            >
              All in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: "2%",
          bottom: "5%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleReady();
            // setCount(count + 1);
            // Alert.aler t(count.toString());
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
            // Alert.aler t(count.toString());
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
            // props.navigation.navigate("HOME");

            // Alert.aler t(count.toString());
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
