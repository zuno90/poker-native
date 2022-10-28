import { useEffect } from "react";
import { Platform } from "react-native";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  FormControl,
  Stack,
  Icon,
  Image,
  Text,
  useToast,
} from "native-base";
import {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { signInWithFb } from "../utils/firebaseLogin";
import { LoginButton } from "react-native-fbsdk-next";
import * as Google from "expo-auth-session/providers/google";
import { useAuth } from "../context/AuthContext";
import { TCredential } from "../__types__/credential.type";
import axios from "axios";
import {
  API_ANDROID_URL,
  API_IOS_URL,
  API_URL,
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from "react-native-dotenv";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "346689803663-cqemermkk3fk8rnlvcfg5vksf9n463pk.apps.googleusercontent.com",
});

const Signin: React.FC = ({ route, navigation }: any) => {
  const { authState, signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredential>();
  const toast = useToast();

  // console.log(authState)

  const onSubmit = async (data: TCredential) => {
    try {
      console.log("data sign in", data);
      const res = await axios.post(
        // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
        API_URL + "/auth/signin",
        {
          type: "normal",
          payload: data,
        }
      );
      console.log(res.data);
      const { success, msg, accessToken } = res.data;
      if (!success) throw new Error("Bad request!");
      toast.show({
        title: "Login status",
        description: msg,
        variant: "solid",
        placement: "top",
      });
      return signIn(accessToken);
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Login status",
        description: error.message,
        placement: "top",
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const user = await signInWithFb();
      if (!user) return;
      const data = {
        type: "facebook",
        payload: {
          fbEmail: user.user.email,
          fbName: user.user.displayName,
          fbAvatar: user.user.photoURL,
        },
      };
      const res = await axios.post(
        // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
        API_URL + "/auth/signin",
        data
      );
      const { success, msg, accessToken } = res.data;
      if (!success) throw new Error("Bad request!");
      toast.show({
        title: "Login status",
        description: msg,
        variant: "solid",
        placement: "top",
      });
      return signIn(accessToken);
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Login status",
        description: error.message,
        placement: "top",
      });
    }
  };

  // GG login
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });
  useEffect(() => {
    const getGgUser = async () => {
      if (response?.type === "success") {
        const accessToken = response.authentication.accessToken;
        const res = await axios.get(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        await handleGoogleLogin(res.data);
      }
    };
    getGgUser();
  }, [response]);

  // handle google sign in
  const handleGoogleLogin = async (ggUser: any) => {
    try {
      const data = {
        type: "google",
        payload: {
          ggEmail: ggUser.email,
          ggName: ggUser.name,
          ggAvatar: ggUser.picture,
        },
      };
      const res = await axios.post(
        // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
        API_URL + "/auth/signin",
        data
      );
      const { success, msg, accessToken } = res.data;
      if (!success) throw new Error("Bad request!");
      toast.show({
        title: "Login status",
        description: msg,
        variant: "solid",
        placement: "top",
      });
      return signIn(accessToken);
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Login status",
        description: error.message,
        placement: "top",
      });
    }
  };

  const ggSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Box
      w="full"
      h="full"
      top="0"
      px="6"
      position="absolute"
      justifyContent="center"
      bgColor="muted.50"
    >
      <Image
        alignSelf="center"
        source={require("../../assets/logo.png")}
        size="150"
        alt="logo"
      />
      <VStack space="5">
        <Stack space="2">
          <FormControl isRequired isInvalid={"username" in errors}>
            <FormControl.Label>User name </FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="zuno"
                  InputLeftElement={
                    <Icon as={Feather} name="user" ml="2" color="purple.500" />
                  }
                />
              )}
              name="username"
              rules={{
                required: "User name is required",
                minLength: {
                  value: 6,
                  message: "User name is min 6 character",
                },
                maxLength: {
                  value: 50,
                  message: "User name is max 50 character",
                },
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.username?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={"password" in errors}>
            <FormControl.Label>Password </FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                  placeholder="******"
                  InputLeftElement={
                    <Icon
                      as={MaterialCommunityIcons}
                      name="onepassword"
                      ml="2"
                      color="purple.500"
                    />
                  }
                />
              )}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Password is min 6 character" },
                maxLength: {
                  value: 50,
                  message: "Password is max 50 character",
                },
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage>
              {errors.password?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Stack>
        <HStack alignItems="center" justifyContent="space-between">
          <Text>Do not have an account?</Text>
          <Button
            onPress={() => navigation.navigate("SIGN UP")}
            variant="ghost"
            colorScheme="success"
          >
            Sign Up
          </Button>
        </HStack>
        <VStack space="4">
          <Button
            onPress={handleFacebookLogin}
            leftIcon={<Entypo name="facebook" size={24} color="white" />}
            colorScheme="blue"
          >
            Facebook
          </Button>
          <Button
            // onPress={() => {
            //   promptAsync({ showInRecents: true });
            // }}
            onPress={ggSignIn}
            leftIcon={<AntDesign name="google" size={24} color="white" />}
            colorScheme="red"
          >
            Google
          </Button>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={ggSignIn}
          />
          <Button onPress={handleSubmit(onSubmit)} colorScheme="green">
            SIGN IN
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Signin;
