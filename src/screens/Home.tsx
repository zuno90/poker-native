import { useContext, useEffect, useMemo } from "react";

import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

import { Alert, TouchableOpacity, View } from "react-native";
import { Text, Image } from "native-base";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { useAuth } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { gameAction } from "../module/game/GameSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { VALUE } from "../../constant/common";
import { homeAction, selectHome } from "../module/home/HomeSlice";
interface InfoUser {
  id?: string;
  isHost?: false;
  chips?: number;
  betChips?: number;
  seat?: number;
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
  const roomContext = useContext(GameContext);
  const { room } = useContext(GameContext);
  const { profileFake1 } = useContext(GameContext);
  const { profileFake2 } = useContext(GameContext);
  const { myProfile } = useContext(GameContext);
  const isFocused = useMemo(() => props.navigation.isFocused(), []);
  const dispatch = useDispatch();
  const client = new Colyseus.Client("ws://175.41.154.239");

  const getAvailableRooms = async (infoUser?: InfoUser) => {
    const room = await client.getAvailableRooms("noob");
    if (room.length !== 0) {
      const { clients, roomId } = room[0];

      if (clients <= 4 && clients > 1) {
        const params = {
          id: user.id,
          chips: user.chips,
          isHost: false,
          seat: 2,
          turn: 2,
          cards: [],
        };
        try {
          await client.joinById(roomId, params).then((value) => {
            roomContext.handleMyProfile(value);
          });
        } catch (error) {}
      }
      // else if (clients === 1) {
      //   try {
      //     await client.joinById(roomId, infoUser).then((value) => {
      //       roomContext.handleProfileFake1(value);
      //     });
      //     await client
      //       .joinById(roomId, {
      //         betChips: 0,
      //         id: "zuno-bot22",
      //         isHost: false,
      //         chips: 10000,
      //         seat: 3,
      //         turn: 3,
      //         role: "Bot",
      //         cards: [],
      //       })
      //       .then((value2) => {
      //         roomContext.handleProfileFake2(value2);
      //       });
      //   } catch (error) {}
      // }
    } else {
      createRoom();
    }
    return room;
  };
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
      seat: 1,
      turn: 1,
      cards: [],
      betChips: 0,
      role: "Player",
    };
    props.navigation.navigate("GAME");
    const myProfile = await client
      .joinOrCreate("noob", params)
      .then((value) => {
        roomContext.handleMyProfile(value);

        return value;
      });

    if (myProfile) {
      myProfile && props.navigation.navigate("GAME");
      getAvailableRooms({
        betChips: 0,
        id: "zuno-bot",
        isHost: false,
        chips: 10000,
        seat: 2,
        turn: 2,
        role: "Bot",
        cards: [],
      });
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
              seat: 2,
              turn: 2,

              role: "Bot",
              cards: [],
              betChips: 0,
            }).then(() => {
              dispatch(gameAction.updateWaveGame(-2));
              props.navigation.navigate("GAME");
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
          bottom: "-2%",
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
              width: "20%",
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
              width: "20%",
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
              width: "20%",
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
