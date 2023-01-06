import { Client, Room } from "colyseus.js";
import { createContext, useState } from "react";

export const GameContext = createContext<any>({});

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room>(null);
  const [myProfile, setMyProfile] = useState<Client>(null);
  const [profileFake1, setProfileFake1] = useState<Client>(null);
  const [profileFake2, setProfileFake2] = useState<Client>(null);
  const [profileFake3, setProfileFake3] = useState<Client>(null);
  const [profileFake4, setProfileFake4] = useState<Client>(null);
  const handleRoom = (valueRoom: Room) => {
    // console.log(valueRoom, "value room");
    setRoom(valueRoom);
  };
  const handleMyProfile = (valueMyProfile: Client) => {
    // console.log(valueMyProfile, "myprofile");
    setMyProfile(valueMyProfile);
  };
  const handleProfileFake1 = (valueProfileFake1: Client) => {
    setProfileFake1(valueProfileFake1);
  };
  const handleProfileFake2 = (valueProfileFake2: Client) => {
    setProfileFake2(valueProfileFake2);
  };
  const handleProfileFake3 = (valueProfileFake3: Client) => {
    setProfileFake3(valueProfileFake3);
  };
  const handleProfileFake4 = (valueProfileFake4: Client) => {
    setProfileFake4(valueProfileFake4);
  };

  return (
    <GameContext.Provider
      value={{
        myProfile,
        handleMyProfile,
        profileFake1,
        handleProfileFake1,
        profileFake2,
        handleProfileFake2,
        profileFake3,
        handleProfileFake3,
        profileFake4,
        handleProfileFake4,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
