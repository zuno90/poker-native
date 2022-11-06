import { Room } from "colyseus.js";
import { createContext, useState } from "react";

export const GameContext = createContext(null);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<Room>(null);

  const handleRoom = (value: Room) => {
    setRoom(value);
  };

  return <GameContext.Provider value={{ room, handleRoom }}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
