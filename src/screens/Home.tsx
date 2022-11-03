import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

import { Text, Image } from "native-base";

import { useAuth } from "../context/AuthContext";
import { Alert, TouchableOpacity, View } from "react-native";

const Home: React.FC = ({ route, navigation }: any) => {
  const {
    authState: { user },
    signOut
  } = useAuth();
  const client = new Colyseus.Client("ws://175.41.154.239");
  // const [rooms, setRooms] = useState<Colyseus.RoomAvailable[]>();

  const getAvailableRooms = async () => {
    try {
      const r = await client.getAvailableRooms("desk");
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   getAvailableRooms();
  // }, [rooms]);

  const createRoom = async () => {
    // const room = await client.create("desk", JSON.stringify(user));
    // console.log(room);
  };

  // return (
  //   <Center>
  //     <Container>
  //       <Box w="full" h="full" py="4">
  //         <HStack justifyContent="space-between">
  //           <Text>{user.username ?? user.email}</Text>
  //           <Image source={{ uri: user.avatar }} alt="Alternate Text" size="sm" />
  //           <Text>Chips: {user.chips}</Text>
  //           <Button onPress={signOut}>LOG OUT</Button>
  //         </HStack>

  //         <HStack space="4">
  //           <Button onPress={createRoom} mt="2" colorScheme="indigo">
  //             Create
  //           </Button>
  //           <Button mt="2" colorScheme="red">
  //             Join
  //           </Button>
  //         </HStack>
  //         <Stack width="full">
  //           <SimpleGrid columns={3} space={2}>
  //             {rooms && rooms.map((item: any, index: number) => <Box key={index}>{item.roomId}</Box>)}
  //           </SimpleGrid>
  //         </Stack>
  //       </Box>
  //     </Container>
  //   </Center>
  // );
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
          Alert.alert("Play Now");
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
        <TouchableOpacity style={{ bottom: 9, right: 10 }}>
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
            onPress={() => {
              Alert.alert("Sup");
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
    </View>
  );
};

export default Home;
