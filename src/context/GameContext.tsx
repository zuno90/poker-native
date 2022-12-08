import { Room } from "colyseus.js";
import { createContext, useState } from "react";

export const GameContext = createContext<any>({});

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room>(null);
  const [profileFake1, setProfileFake1] = useState<Room>(null);
  const [profileFake2, setProfileFake2] = useState<Room>(null);
  const handleRoom = (value: Room) => {
    setRoom(value);
  };
  const handleProfileFake1 = (value: Room) => {
    setProfileFake1(value);
  };
  const handleProfileFake2 = (value: Room) => {
    setProfileFake2(value);
  };
  return (
    <GameContext.Provider
      value={{
        room,
        handleRoom,
        profileFake1,
        handleProfileFake1,
        profileFake2,
        handleProfileFake2,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
