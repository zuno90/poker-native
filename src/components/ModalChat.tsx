import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { debounce } from "lodash";
import {
  Box,
  Icon,
  Image,
  Input,
  Pressable,
  Stagger,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { gameAction, selectGame } from "../module/game/GameSlice";
export const ModalChat = () => {
  const { height, width } = Dimensions.get("window");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [textChat, setTextChat] = useState<string>("");
  const { chatGame } = useSelector(selectGame);
  const { room } = useContext(GameContext);
  const dispatch = useDispatch();
  const {
    authState: { user },
  } = useAuth();

  // await room.send("ROOM_CHAT", {
  //   username: "zuno",
  //   message: "hello zuno!",
  // });

  useEffect(() => {
    try {
      room?.onMessage("ROOM_CHAT", (data: any) => {
        dispatch(gameAction.updateChat(data));
      });
    } catch (error) {
      console.log("error chat modal");
    }
  }, []);

  const handleChat = (value: string) => {
    setTextChat(value);
  };

  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          bottom: "0%",
          left: "0%",
          zIndex: !isOpen ? 8 : 2,
        }}
        onPress={() => {
          setIsOpen(true);
          // room.send("ROOM_CHAT", {
          //   profile: "asdasd",
          //   message: "hello bro232223!",
          // });
        }}
      >
        <Image
          alt="asd"
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={require("../../assets/Chat.png")}
        />
      </TouchableOpacity>

      <LinearGradient
        style={{
          zIndex: 5,
          opacity: isOpen ? 0.9 : 0.02,
          position: "absolute",
          height: height,
          width: width / 2.2,
          left: 0,
          bottom: 0,
        }}
        colors={["#000D26", "#6699FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <VStack
            direction={"row"}
            style={{
              width: "100%",
              height: height,
              position: "relative",
            }}
          >
            {/* navbar */}
            <VStack
              space={4}
              style={{
                width: "20%",
                backgroundColor: "blue",
                height: "100%",
              }}
            ></VStack>
            {/* render msg */}
            <View
              style={{ height: "100%", width: "80%", paddingHorizontal: 10 }}
            >
              <ScrollView
                scrollEnabled={true}
                style={{
                  zIndex: 30,
                  height: "85%",
                  width: "100%",
                  position: "relative",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <VStack
                    direction={"row-reverse"}
                    style={{
                      alignItems: "center",
                      paddingVertical: 10,
                      minHeight: 70,
                    }}
                  >
                    <Box
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: "yellow",
                        marginLeft: 8,
                        position: "relative",
                      }}
                    >
                      {/* userName */}
                      <Text
                        numberOfLines={1}
                        style={{
                          position: "absolute",
                          bottom: -20,
                          color: "white",
                        }}
                      >
                        123
                      </Text>
                    </Box>
                    <Text
                      style={{
                        backgroundColor: "#4343FF",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        color: "white",
                        borderRadius: 8,
                        fontSize: 14,
                        maxWidth: width / 4.5,
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni natus iusto praesentium voluptate commodi ea
                      voluptas aut eum totam, debitis tempore illo nihil,
                      eveniet voluptates in cum? Ratione, dolore officia.
                      {/* asdasd */}
                    </Text>
                  </VStack>

                  <VStack
                    direction={"row-reverse"}
                    style={{
                      alignItems: "center",
                      paddingVertical: 10,
                      minHeight: 70,
                    }}
                  >
                    <Box
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: "yellow",
                        marginLeft: 8,
                        position: "relative",
                      }}
                    >
                      {/* userName */}
                      <Text
                        numberOfLines={1}
                        style={{
                          position: "absolute",
                          bottom: -20,
                          color: "white",
                        }}
                      >
                        123
                      </Text>
                    </Box>
                    <Text
                      style={{
                        backgroundColor: "#4343FF",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        color: "white",
                        borderRadius: 8,
                        fontSize: 14,
                        maxWidth: width / 4.5,
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni natus iusto praesentium voluptate commodi ea
                      voluptas aut eum totam, debitis tempore illo nihil,
                      eveniet voluptates in cum? Ratione, dolore officia.
                      {/* asdasd */}
                    </Text>
                  </VStack>

                  <VStack
                    direction={"row-reverse"}
                    style={{
                      alignItems: "center",
                      paddingVertical: 10,
                      minHeight: 70,
                    }}
                  >
                    <Box
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        backgroundColor: "yellow",
                        marginLeft: 8,
                        position: "relative",
                      }}
                    >
                      {/* userName */}
                      <Text
                        numberOfLines={1}
                        style={{
                          position: "absolute",
                          bottom: -20,
                          color: "white",
                        }}
                      >
                        123
                      </Text>
                    </Box>
                    <Text
                      style={{
                        backgroundColor: "#4343FF",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        color: "white",
                        borderRadius: 8,
                        fontSize: 14,
                        maxWidth: width / 4.5,
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni natus iusto praesentium voluptate commodi ea
                      voluptas aut eum totam, debitis tempore illo nihil,
                      eveniet voluptates in cum? Ratione, dolore officia.
                      {/* asdasd */}
                    </Text>
                  </VStack>
                </View>
              </ScrollView>
              <VStack
                direction={"row"}
                space={2}
                style={{
                  alignItems: "center",
                  height: "15%",
                  width: "80%",
                  bottom: 0,
                }}
              >
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "red",
                    borderRadius: 50,
                  }}
                ></Box>
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "red",
                    borderRadius: 50,
                  }}
                ></Box>
                <Box
                  style={{
                    width: width / 4.5,
                    // minWidth: 150,
                    borderRadius: 12,
                    backgroundColor: "white",
                  }}
                >
                  <Input
                    style={{ paddingLeft: 12 }}
                    borderRadius={12}
                    isFullWidth={true}
                    type="text"
                    onChangeText={debounce(handleChat, 400)}
                    // {(value) => {
                    //
                    // }}
                    InputRightElement={
                      <Pressable onPress={() => {}}>
                        <Icon
                          as={<MaterialIcons name="send" />}
                          size={6}
                          mr="2"
                          color="blue.700"
                        />
                      </Pressable>
                    }
                  />
                </Box>
              </VStack>
            </View>

            {/* keyboard */}
          </VStack>
        </Stagger>
      </LinearGradient>
      {isOpen && (
        <TouchableOpacity
          style={{
            height: height,
            width: width / 1.85,
            position: "absolute",
            // backgroundColor: "red",
            zIndex: 20,
            top: 0,
            right: 0,
          }}
          onPress={() => {
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
};
