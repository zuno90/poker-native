import { Alert, TouchableOpacity, Image, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Slider, Stack } from "native-base";
import { GameContext } from "../../context/GameContext";
import { Room } from "colyseus.js";
import { useDispatch } from "react-redux";
import { gameAction } from "./GameSlice";

export const Action = ({
  action,
  ImageAction,
  title,
  chips = 10000,
  profile = "profile",
}: any) => {
  const { room } = useContext(GameContext);
  const myroom = room as Room;
  const [valueChipRaise, setValueChipRaise] = useState(100);
  const [statusRaise, setStatusRaise] = useState(0);
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setStatusRaise((statusRaise) => statusRaise + 1);

          if (title === "Raise" && statusRaise === 1) {
            action();
            setStatusRaise(0);
          } else if (title !== "Raise") {
            action();
            setStatusRaise(0);
          }
        }}
        style={{
          marginTop: "6%",
          zIndex: 9,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="cover"
          source={ImageAction}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{ color: "white" }}>{title || "None"}</Text>
      </TouchableOpacity>
      {title === "Raise" && statusRaise === 1 && (
        <Box
          alignItems="center"
          w="0"
          h="100"
          style={{
            position: "absolute",
            bottom: "100%",
            right: "-25%",
          }}
        >
          <Stack
            space={0}
            alignItems="center"
            w="400"
            direction="row"
            style={{ position: "relative" }}
          >
            <Text style={{ color: "white", position: "absolute", left: 30 }}>
              {valueChipRaise}
            </Text>
            <Slider
              // style={{ position: "absolute" }}
              orientation="vertical"
              defaultValue={0}
              colorScheme="yellow"
              onChange={(value) => {
                setValueChipRaise(
                  Math.round((Math.floor(value) * chips) / 100)
                );
              }}
              onChangeEnd={(value) => {
                dispatch(
                  gameAction.updateRaiseBet(
                    Math.round((Math.floor(value) * chips) / 100)
                  )
                );
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Stack>
        </Box>
      )}
    </>
  );
};
