import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

import { Box, Button, Text, Container, SimpleGrid, Center, Stack, HStack, Image, useToast } from "native-base";

import { useAuth } from "../context/AuthContext";

const Home: React.FC = ({ route, navigation }: any) => {
  const {
    authState: { user },
    signOut
  } = useAuth();
  const client = new Colyseus.Client("ws://175.41.154.239");
  const room = new Colyseus.Room("desk");
  const [rooms, setRooms] = useState<Colyseus.RoomAvailable[]>();
  const toast = useToast();

  useEffect(() => {
    // getAvailableRooms();
    // room.id
  }, []);

  // const getAvailableRooms = async () => {
  //   try {
  //     const r = await client.getAvailableRooms("desk");
  //     setRooms(r);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const createRoom = async () => {
    try {
      const room = await client.joinOrCreate("desk", JSON.stringify(user));

      console.log("room", room);
    } catch (error) {
      console.log("chefck error", error);
    }
  };

  // const handleJoinRoom = async ()

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
    <View>
      <Image
        alt="No image"
        source={require("../../assets/BackgroundGame.png")}
        style={{ width: "100%", height: "100%", zIndex: -2 }}
      />
    </View>
  );
};

export default Home;
