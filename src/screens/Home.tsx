import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, Text, Container, SimpleGrid, Center, Stack, HStack, Image } from "native-base";
import { useAuth } from "../context/AuthContext";
import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import { useEffect, useState } from "react";

const Home: React.FC = ({ route, navigation }: any) => {
  const {
    authState: { user },
    signOut
  } = useAuth();
  const client = new Colyseus.Client("ws://175.41.154.239");
  const [rooms, setRooms] = useState<Colyseus.RoomAvailable[]>();

  const getAvailableRooms = async () => {
    try {
      const r = await client.getAvailableRooms("desk");
      setRooms(r);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAvailableRooms();
  }, [rooms]);

  const createRoom = async () => {
    const room = await client.create("desk", JSON.stringify(user));
    console.log(room);
  };

  return (
    <Center>
      <Container>
        <Box w="full" h="full" py="4">
          <HStack justifyContent="space-between">
            <Text>{user.username ?? user.email}</Text>
            <Image source={{ uri: user.avatar }} alt="Alternate Text" size="sm" />
            <Text>Chips: {user.chips}</Text>
            <Button onPress={signOut}>LOG OUT</Button>
          </HStack>

          <HStack space="4">
            <Button onPress={createRoom} mt="2" colorScheme="indigo">
              Create
            </Button>
            <Button mt="2" colorScheme="red">
              Join
            </Button>
            <Button mt="2" colorScheme="red" onPress={signOut}>
              logout
            </Button>
          </HStack>
          <Stack width="full">
            <SimpleGrid columns={3} space={2}>
              {rooms && rooms.map((item: any, index: number) => <Box key={index}>{item.roomId}</Box>)}
            </SimpleGrid>
          </Stack>
        </Box>
      </Container>
    </Center>
  );
};

export default Home;
