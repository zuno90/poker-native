import { useContext, useEffect, useMemo } from "react";

import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

import { Alert, TouchableOpacity, View } from "react-native";
import { Text, Image } from "native-base";

import { useAuth } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { gameAction } from "../module/game/GameSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
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
    checkAuth,
    signOut,
  } = useAuth();
  const navigation = useNavigation();
  const isFocused = useMemo(() => navigation.isFocused(), []);
  const roomContext = useContext(GameContext);
  const dispatch = useDispatch();
  const client = new Colyseus.Client("ws://175.41.154.239");
  const getAvailableRooms = async (infoUser?: InfoUser) => {
    const room = await client.getAvailableRooms("desk");
    if (room.length !== 0) {
      const { clients, roomId } = room[0];
      if (clients <= 4 && clients > 1) {
        const params = {
          id: user.id,
          chips: user.chips,
          isHost: true,
          turn: clients + 1,
          cards: [],
        };
        try {
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
          const profileFake1 = await client.joinById(roomId, infoUser);
          const profileFake2 = await client.joinById(roomId, {
            betChips: 0,
            id: "zuno-bot22",
            isHost: false,
            chips: 10000,
            turn: 3,
            role: "Bot",
            cards: [],
          });

          if (room) {
            roomContext.handleProfileFake1(profileFake1);
            roomContext.handleProfileFake2(profileFake2);
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
  };
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    if (isFocused) {
      checkAuth();
    }
  }, [isFocused]);
  const createRoom = async () => {
    const params = {
      id: user.id,
      chips: user.chips,
      isHost: true,
      turn: 1,
      cards: [],
      betChips: 0,
      role: "Player",
    };

    const room = await client.joinOrCreate("desk", params);

    if (room) {
      getAvailableRooms({
        betChips: 0,
        id: "zuno-bot",
        isHost: false,
        chips: 10000,
        turn: 2,
        role: "Bot",
        cards: [],
      });
      roomContext.handleRoom(room);

      room && props.navigation.navigate("GAME");
    }
  };

  return (
    <View style={{ position: "relative" }}>
      <Image
        resizeMode="cover"
        alt="No image"
        source={require("../../assets/BackgroundGame.png")}
        style={{
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
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
          right: "32%",
        }}
      />
      <Image
        resizeMode="cover"
        alt="No image"
        source={require("../../assets/GirlHome.png")}
        style={{
          width: "35%",
          height: "90%",
          position: "absolute",
          bottom: 0,
          zIndex: 2,
          right: "7%",
          // backgroundColor: "white",
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 5,
          top: "50%",
          right: "35%",
          width: "30%",
          height: "20%",
        }}
        onPress={() => {
          if (user.chips >= 100) {
            getAvailableRooms({
              id: "zuno-bot",
              isHost: false,
              chips: 10000,
              turn: 2,
              role: "Bot",
              cards: [],
              betChips: 0,
            }).then(() => {
              dispatch(gameAction.updateIsRunning(false));
            });
          } else {
            Alert.alert("not enough money to play game");
          }
          // handleLeaveRoom();
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
          zIndex: 4,
        }}
      >
        <TouchableOpacity style={{ bottom: 9, right: 10 }} onPress={signOut}>
          <Image
            alt="No image"
            source={require("../../assets/SettingButton.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ bottom: 9, right: 10, paddingHorizontal: 12 }}
        >
          <Image
            alt="No image"
            source={require("../../assets/SettingButton.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ bottom: 9, right: 10 }}>
          <Image
            alt="No image"
            source={require("../../assets/SettingButton.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>

      {/* Support */}
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 4,
          bottom: "1%",
          right: "1%",
        }}
        onPress={() => {
          Alert.alert("sup");
        }}
      >
        <Image
          resizeMode="contain"
          alt="No image"
          source={require("../../assets/Support.png")}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </TouchableOpacity>
      {/* Building Left */}
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: "0%",
          left: 0,
          width: "50%",
          height: "25%",
        }}
      >
        <Image
          resizeMode="center"
          alt="No image"
          source={require("../../assets/Building.png")}
          style={{
            width: "100%",
            height: "80%",
            bottom: 0,
            left: 0,
            // backgroundColor: "white",
            position: "absolute",
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "60%",
            height: "60%",
            justifyContent: "space-around",
            bottom: "20%",
            left: "30%",
            position: "absolute",
          }}
        >
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5,
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
                zIndex: 6,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5,
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
                zIndex: 6,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "30%",
              height: "100%",
              zIndex: 5,
            }}
          >
            <Image
              resizeMode="contain"
              alt="No image"
              source={require("../../assets/Rate.png")}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 6,
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
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          top: "2%",
          left: "0%",
          zIndex: 4,
          maxHeight: 300,
          maxWidth: 250,
        }}
      >
        {/* User */}
        <View
          style={{
            position: "relative",
            width: "60%",
            height: "100%",
            display: "flex",
            marginLeft: "-2%",
            // backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                width: "50%",
                height: "45%",
                maxHeight: 80,
                position: "absolute",
                // bottom: 5,
              }}
            />
            <Text
              style={{
                color: "white",
                position: "absolute",
                bottom: 5,
              }}
            >
              {user.username}
            </Text>
          </TouchableOpacity>
        </View>

        {/* coins */}
        <View
          style={{
            position: "relative",
            width: "50%",
            height: "100%",
            marginLeft: "-5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode="contain"
            alt="No image"
            source={require(`../../assets/FrameCoins.png`)}
            style={{
              width: "110%",
              height: "100%",
            }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              paddingLeft: 12,
            }}
          >
            {user.chips}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
