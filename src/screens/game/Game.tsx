import React, { useContext, useEffect } from "react";
import { Room } from "colyseus.js";

import { Text, View, Button } from "native-base";

import { GameContext } from "../../context/GameContext";

const Game = (props: any) => {
  const { room, handleRoom } = useContext(GameContext);
  const myroom = room as Room;

  useEffect(() => {
    if (room && room !== null) {
      myroom.onStateChange((state) => {
        console.log("kiem tra state game", state);
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

  console.log("afdsafd", room);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>hello</Text>

      <Button onPress={handleReady}>Ready Player</Button>
      <Button onPress={handleLeaveRoom}>Leave Room</Button>
    </View>
  );
};

export default Game;
