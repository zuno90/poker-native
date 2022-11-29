import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

type TUserInfo = {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  avatar?: string;
  chips: number;
};

type TAuthState = {
  isAuth: boolean;
  user: TUserInfo;
};

type TAuthContext = {
  authState: TAuthState;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<TAuthContext>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<TAuthState>({
    isAuth: false,
    user: {
      id: "",
      email: "string",
      username: "string",
      name: "string",
      avatar: "string",
      chips: 1,
    },
  });

  const checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("check auth context", accessToken);
    if (!accessToken) return;
    try {
      const res = await axios.get(`${API_URL}/user/info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { success, data } = res.data;
      if (!success) throw new Error("Bad request!");
      return setAuthState({
        isAuth: true,
        user: {
          id: data._id,
          email: data.email,
          username: data.username,
          name: data.name,
          avatar: data.avatar,
          chips: data.chips,
        },
      });
    } catch (error) {
      await AsyncStorage.removeItem("accessToken");
      console.error(error);
      return setAuthState({
        isAuth: false,
        user: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
    await checkAuth();
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      return setAuthState({
        isAuth: false,
        user: null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const authContextValue = { authState, signIn, signOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
