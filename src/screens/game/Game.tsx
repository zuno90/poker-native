import React, { useContext, useEffect, useRef, useState } from "react";
import { Room } from "colyseus.js";

import { Text, View, Button } from "native-base";

import { GameContext } from "../../context/GameContext";
import { Alert, Animated, Image, TouchableOpacity } from "react-native";

const Game = (props: any) => {
  const { room, handleRoom } = useContext(GameContext);
  const myroom = room as Room;
  let [count, setCount] = useState(0);
  useEffect(() => {
    if (room && room !== null) {
      myroom.onStateChange((state) => {
        // console.log("kiem tra state gamessadá", state);
      });

      // room.onMessage("powerup", (message) => {
      //   console.log("message received from server");
      //   console.log(message);
      // });

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
    myroom.send("onReady", true);
  };

  const handleLeaveRoom = () => {
    myroom.leave();
  };
  // console.log(room.state.banker5Cards, "asdasd");
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
    if (count % 2 == 1) {
      Animated.sequence([
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard1, {
              useNativeDriver: false,
              toValue: 100,
              duration: 500,
            }),
            Animated.timing(PositionVerticalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 500,
            }),
            Animated.timing(PositionHorizontalCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 500,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
            Animated.timing(UnRotateCard1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
            Animated.timing(Opacity1, {
              useNativeDriver: false,
              toValue: 0,
              duration: 1000,
            }),
            Animated.timing(UnOpacity1, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
          ]),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(SizeCard2, {
              useNativeDriver: false,
              toValue: 100,
              duration: 500,
            }),
            Animated.timing(PositionVerticalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 500,
            }),

            Animated.timing(PositionHorizontalCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 500,
            }),
          ]),
          Animated.parallel([
            Animated.timing(RotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
            Animated.timing(UnRotateCard2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
            Animated.timing(Opacity2, {
              useNativeDriver: false,
              toValue: 0,
              duration: 1000,
            }),
            Animated.timing(UnOpacity2, {
              useNativeDriver: false,
              toValue: 1,
              duration: 1000,
            }),
          ]),
        ]),
      ]).start();
    } else {
      Animated.timing(SizeCard1, {
        useNativeDriver: false,
        toValue: 75,
        duration: 500,
      }).start();
      Animated.timing(SizeCard2, {
        useNativeDriver: false,
        toValue: 75,
        duration: 500,
      }).start();
      Animated.timing(PositionVerticalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
      Animated.timing(PositionHorizontalCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();

      Animated.timing(PositionVerticalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();

      Animated.timing(PositionHorizontalCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
      Animated.timing(RotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
      Animated.timing(UnRotateCard1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 1000,
      }).start();
      Animated.timing(RotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
      Animated.timing(UnRotateCard2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 1000,
      }).start();
      Animated.timing(Opacity1, {
        useNativeDriver: false,
        toValue: 1,
        duration: 500,
      }).start();
      Animated.timing(UnOpacity1, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
      Animated.timing(Opacity2, {
        useNativeDriver: false,
        toValue: 1,
        duration: 500,
      }).start();
      Animated.timing(UnOpacity2, {
        useNativeDriver: false,
        toValue: 0,
        duration: 500,
      }).start();
    }
  }, [count]);
  const topPercentCard1 = PositionVerticalCard1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["5%", "75%", "5%"],
  });
  const rightPercentCard1 = PositionHorizontalCard1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["5%", "46%", "50%"],
  });
  const topPercentCard2 = PositionVerticalCard2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["5%", "75%", "5%"],
  });
  const rightPercentCard2 = PositionHorizontalCard2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["5%", "46%", "38%"],
  });
  const DegCard2 = RotateCard2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["0deg", "0deg", "180deg"],
  });
  const DegCard1 = RotateCard1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["0deg", "0deg", "180deg"],
  });
  const UnDegCard1 = UnRotateCard1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["0deg", "-180deg", "0deg"],
  });
  const UnDegCard2 = UnRotateCard2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["0deg", "-180deg", "0deg"],
  });
  const OpacityCard2 = Opacity2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const OpacityCard1 = Opacity1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const UnOpacityCard1 = UnOpacity1.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const UnOpacityCard2 = UnOpacity2.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  return (
    <View
      style={{
        position: "relative",
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        resizeMode="contain"
        source={require("../../../assets/BackgroundRoom.png")}
        style={{ width: "101%", height: "101%" }}
      />
      {/* Host */}
      <View style={{ position: "absolute", left: "45%", top: "5%" }}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: 75, height: 75 }}
        />
      </View>
      {/* User */}
      {/* Close */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: topPercentCard1,
          right: rightPercentCard1,
          zIndex: 2,
          width: SizeCard1,
          height: SizeCard1,
          transform: [{ rotateY: DegCard1 }],
          opacity: OpacityCard1,
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
          opacity: UnOpacityCard1,
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/K♥.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Close Card2 */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: topPercentCard2,
          right: rightPercentCard2,
          zIndex: 2,
          width: SizeCard2,
          height: SizeCard2,
          transform: [{ rotateY: DegCard2 }],
          opacity: OpacityCard2,
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
          opacity: UnOpacityCard2,
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/A♥.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>
      {/* Card user */}
      <View
        style={{
          position: "absolute",
          left: "38%",
          bottom: "5%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: 95, height: 95 }}
        /> */}
        {/* <Image
          resizeMode="contain"
          source={require("../../../assets/deckofcard/CloseCard.png")}
          style={{ width: 95, height: 95 }}
        /> */}
      </View>
      <View
        style={{
          position: "absolute",
          left: "2%",
          bottom: "5%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCount(count + 1);
            // Alert.alert(count.toString());
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/deckofcard/CloseCard.png")}
            style={{ width: 95, height: 95 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;
