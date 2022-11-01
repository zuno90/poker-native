import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
<<<<<<< HEAD
=======
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586

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
  user: TUserInfo | null;
};

type TAuthContext = {
  authState: TAuthState;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<TAuthState>({
    isAuth: false,
<<<<<<< HEAD
    user: null,
=======
    user: null
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586
  });

  const checkAuth = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) return;
    try {
<<<<<<< HEAD
      const res = await axios.get(`http://175.41.154.239/user/info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const { success, data } = res.data;
      if (!success) throw new Error("Bad request!");
      console.log(data);
=======
      const res = await axios.get(`${API_URL}/user/info`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const { success, data } = res.data;
      if (!success) throw new Error("Bad request!");
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586
      return setAuthState({
        isAuth: true,
        user: {
          id: data._id,
          email: data.email,
          username: data.username,
          name: data.name,
          avatar: data.avatar,
<<<<<<< HEAD
          chips: data.chips,
        },
=======
          chips: data.chips
        }
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586
      });
    } catch (error) {
      await AsyncStorage.removeItem("accessToken");
      console.error(error);
      return setAuthState({
        isAuth: false,
<<<<<<< HEAD
        user: null,
<<<<<<< HEAD
    })

    const checkAuth = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken")
        console.log("check auth context", accessToken)
        if (!accessToken) return
        try {
            const res = await axios.get(`${API_URL}/user/info`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            const { success, data } = res.data
            if (!success) throw new Error("Bad request!")
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
            })
        } catch (error) {
            await AsyncStorage.removeItem("accessToken")
            console.error(error)
            return setAuthState({
                isAuth: false,
                user: null,
            })
        }
=======
=======
        user: null
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586
      });
>>>>>>> b33ac7f73b76b8fa00659ef4f371453ceee2ab97
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
<<<<<<< HEAD
    console.log(token, "asdasdj");
    await checkAuth();
  };

  const signOut = async () => {};

  const authContextValue = { authState, signIn, signOut };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
=======
    await checkAuth();
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      GoogleSignin.signOut();
      return setAuthState({
        isAuth: false,
        user: null
      });
    } catch (error) {
      console.error(error);
    }
  };

  const authContextValue = { authState, signIn, signOut };
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
>>>>>>> 8d9bd1d51e9b883e8d7dfbbd1fbd367d4d69f586
};

export const useAuth = () => {
  return useContext(AuthContext);
};
