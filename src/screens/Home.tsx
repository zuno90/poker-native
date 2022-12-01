import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

import { Alert, TouchableOpacity, View } from "react-native";
import { Text, Image, Button } from "native-base";

import { useAuth } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";

interface InfoUser {
  id?: string;
  isHost?: false;
  chips?: number;
  betChips?: number;
  turn?: number;
  role?: "Bot" | "Player";
  cards?: [];
}

const Home: React.FC = (props: any) => {
  const {
    authState: { user },
    signOut
  } = useAuth();
  const roomContext = useContext(GameContext);

  const client = new Colyseus.Client("ws://175.41.154.239");
  const [rooms, setRooms] = useState<Colyseus.RoomAvailable[]>([]);

  const getAvailableRooms = async (infoUser?: InfoUser) => {
    const room = await client.getAvailableRooms("desk");
    console.log(room, "room");
    if (room.length !== 0) {
      const { clients, roomId } = room[0];
      if (clients <= 4 && clients > 1) {
        const params = {
          id: user.id,
          chips: user.chips,
          isHost: true,
          turn: clients + 1,
          cards: []
        };
        try {
          // console.log("afdsafdsafsd", roomId);

          const room = await client.joinById(roomId, params);

          if (room) {
            roomContext.handleRoom(room);

            room && props.navigation.navigate("GAME");
          }
        } catch (error) {
          console.log("adsf", error);
        }
      } else if (clients === 1) {
        try {
          // console.log("afdsafdsafsd", roomId);

          const room = await client.joinById(roomId, infoUser);

          if (room) {
            roomContext.handleRoom(room);

            room && props.navigation.navigate("GAME");
          }
        } catch (error) {
          console.log("adsf", error);
        }
      }
    } else {
      createRoom();
    }
    return room;
    // try {
    //   const room = await client.getAvailableRooms("desk");
    //   if (room) {
    //     setRooms(room);
    //   }
    //   console.log(room, "room avai");
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // useEffect(() => {
  //   getAvailableRooms();
  // }, [rooms]);

  const createRoom = async () => {
    const params = {
      id: user.id,
      chips: user.chips,
      isHost: true,
      turn: 1,
      cards: [],
      betChips: 0,
      role: "Player"
    };

    const room = await client.joinOrCreate("desk", params);

    if (room) {
      console.log("kiem tra ham tao value", room);
      getAvailableRooms({
        betChips: 0,
        id: "zuno-bot",
        isHost: false,
        chips: 10000,
        turn: 2,
        role: "Bot",
        cards: []
      });
      roomContext.handleRoom(room);

      room && props.navigation.navigate("GAME");
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <Image
        alt="No image"
        source={require("../../assets/BackgroundGame.png")}
        style={{ width: "102%", height: "102%", zIndex: -2 }}
      />

      <Image
        resizeMode="contain"
        alt="No image"
        source={require("../../assets/PokerLogoHome.png")}
        style={{
          width: "35%",
          height: "60%",
          position: "absolute",
          zIndex: 2,
          top: "0%",
          right: "32%"
        }}
      />
      <Image
        resizeMode="contain"
        alt="No image"
        source={require("../../assets/GirlHome.png")}
        style={{
          width: "35%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
          top: "10%",
          right: "7%"
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 5,
          top: "50%",
          right: "35%",
          width: "30%",
          height: "20%"
        }}
        onPress={() => {
          getAvailableRooms({
            id: "zuno-bot",
            isHost: false,
            chips: 10000,
            turn: 2,
            role: "Bot",
            cards: [],
            betChips: 0
          });
        }}
      >
        <Image
          resizeMode="contain"
          alt="No image"
          source={require("../../assets/PlayNow.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      {/* Setting */}
      <View
        style={{
          width: 150,
          height: 50,
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          // alignItems: "flex-end",
          backgroundColor: "transparent",
          justifyContent: "flex-end",
          marginTop: "2%",
          top: 0,
          right: "1%",
          zIndex: 4
        }}
      >
        <TouchableOpacity style={{ bottom: 9, right: 10 }} onPress={signOut}>
          <Image alt="No image" source={require("../../assets/SettingButton.png")} style={{ width: 36, height: 36 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ bottom: 9, right: 10, paddingHorizontal: 12 }}>
          <Image alt="No image" source={require("../../assets/SettingButton.png")} style={{ width: 36, height: 36 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ bottom: 9, right: 10 }}>
          <Image alt="No image" source={require("../../assets/SettingButton.png")} style={{ width: 36, height: 36 }} />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 4,
          bottom: "22%",
          right: 0,
          width: 50,
          height: 50
        }}
        onPress={() => {
          Alert.alert("Sup");
        }}
      >
        <Image resizeMode="contain" alt="No image" source={require("../../assets/Support.png")} style={{}} />
      </TouchableOpacity>
      {/* Building Left */}
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: 0,
          left: 0,
          width: "50%",
          height: "25%"
        }}
      >
        <Image
          resizeMode="contain"
          alt="No image"
          source={require("../../assets/Building.png")}
          style={{ width: "100%", height: "100%" }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "60%",
            height: "60%",
            justifyContent: "space-around",
            bottom: 90,
            left: "110%"
          }}
        >
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5
            }}
            onPress={() => {
              Alert.alert("Sup");
            }}
          >
            <Image
              resizeMode="contain"
              alt="No image"
              source={require("../../assets/Mail.png")}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 6
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5
            }}
            onPress={() => {
              Alert.alert("Sup");
            }}
          >
            <Image
              resizeMode="contain"
              alt="No image"
              source={require("../../assets/Support.png")}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 6
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5
            }}
          >
            <Image
              resizeMode="contain"
              alt="No image"
              source={require("../../assets/Rate.png")}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 6
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile */}
      <View
        style={{
          width: "30%",
          height: "40%",
          position: "absolute",
          backgroundColor: "transparent",
          // marginTop: "2%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          top: "-2%",
          left: "-2%",
          zIndex: 4
        }}
      >
        <TouchableOpacity
          style={{
            position: "relative",
            width: "60%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "-2%"
          }}
        >
          <Image
            resizeMode="contain"
            alt="No image"
            source={require("../../assets/FrameUser.png")}
            style={{ width: "100%", height: "100%" }}
          />
          <Image
            resizeMode="contain"
            alt="No image"
            source={require(`../../assets/GirlHome.png`)}
            style={{
              width: "60%",
              height: "50%",
              position: "absolute",
              top: "22%"
            }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              bottom: 0
              // left: "25%",
            }}
          >
            {user.username}
          </Text>
          {/* <Text style={{ fontWeight: "bold" }}>
            I am bold
            <Text style={{ color: "red" }}>and red</Text>
          </Text> */}
        </TouchableOpacity>
        <View
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            marginLeft: "-5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            resizeMode="contain"
            alt="No image"
            source={require(`../../assets/FrameCoins.png`)}
            style={{
              width: "110%",
              height: "100%"
            }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              paddingLeft: 12
              // fontFamily: "Pricedown",
            }}
          >
            {user.chips}
          </Text>
        </View>
      </View>

      {/* <View
          style={{
            width: "100%",
            height: "100%",
            zIndex: 10000,
            backgroundColor: "black",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text color={"white"} fontSize={30}>
            TEST SCREEN
          </Text>
          <Button marginBottom={6} onPress={getAvailableRooms}>
            Get Room
          </Button>
          <Button marginBottom={6} onPress={createRoom}>
            Create Room
          </Button>

          <View>
            {rooms.length > 0 &&
              rooms.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    minWidth: 200,
                  }}
                >
                  <Text fontSize={20} color={"white"}>
                    {item.roomId}
                  </Text>
                  <Button onPress={() => joinRoom(item)}>Join</Button>
                </View>
              ))}
          </View>
        </View> */}
    </View>
  );
};

export default Home;
