import { useEffect } from "react";
import { Platform } from "react-native";
import { Input, Image, Text, useToast } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { signInWithFb } from "../utils/firebaseLogin";
import { useAuth } from "../context/AuthContext";
import { TCredential } from "../__types__/credential.type";
import axios from "axios";
import { API_URL } from "react-native-dotenv";

const Signin: React.FC = ({ route, navigation }: any) => {
  const { authState, signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TCredential>();
  const toast = useToast();

  const onSubmit = async (data: TCredential) => {
    try {
      console.log("data sign in", data);
      console.log(API_URL + "/auth/signin");
      const res = await axios.post(
        // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
        API_URL + "/auth/signin",
        {
          type: "normal",
          payload: data,
        }
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
      // console.error(error)
      toast.show({
        title: "Login status",
        description: error.message,
        placement: "top",
      });
    }
  };

  // handle facebook signin
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

  // handle google sign in
  // const handleGoogleLogin = async () => {
  //   try {
  //     const user = await signInWithGg();
  //     if (!user) return;
  //     const data = {
  //       type: "google",
  //       payload: {
  //         ggEmail: user.user.email,
  //         ggName: user.user.name,
  //         ggAvatar: user.user.photo,
  //       },
  //     };
  //     const res = await axios.post(
  //       // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
  //       API_URL + "/auth/signin",
  //       data
  //     );
  //     const { success, msg, accessToken } = res.data;
  //     if (!success) throw new Error("Bad request!");
  //     toast.show({
  //       title: "Login status",
  //       description: msg,
  //       variant: "solid",
  //       placement: "top",
  //     });
  //     return signIn(accessToken);
  //   } catch (error) {
  //     console.error(error);
  //     toast.show({
  //       title: "Login status",
  //       description: error.message,
  //       placement: "top",
  //     });
  //   }
  // };

  return (
    <View>
      <Image
        alt="No image"
        source={require("../../assets/BackgroundGame.png")}
        style={{ width: "100%", height: "100%", zIndex: -2 }}
      />
      <Image
        alt="No image"
        source={require("../../assets/GirlLogin.png")}
        style={{
          position: "absolute",
          width: "38%",
          height: "100%",
          zIndex: 2,
          bottom: 0,
          left: -6,
          backgroundColor: "transparent",
        }}
      />
      <TouchableOpacity style={{ position: "absolute", top: 30, left: "32%" }}>
        <Image
          alt="No image"
          source={require("../../assets/LoginTitle.png")}
          style={{ width: 280, height: 60 }}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          backgroundColor: "transparent",
          flex: 1,
          flexDirection: "column",
          top: "30%",
          left: "35%",
        }}
      >
        <Text style={{ color: "white", top: "-5%" }}>
          Don’t have an account?{"  "}
          <Text
            style={{ textDecorationLine: "underline", color: "white" }}
            onPress={() => {
              navigation.navigate("SIGN UP");
            }}
          >
            Signup now!
          </Text>
        </Text>
        <View style={{ backgroundColor: "transparent", padding: 10 }}>
          <Text style={{ color: "white", marginBottom: 10 }}> Account</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={{
                  height: 30,
                  backgroundColor: "white",
                  fontSize: 12,
                  borderRadius: 4,
                  paddingLeft: 20,
                  paddingRight: 30,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
            rules={{
              required: "Username is required",
              minLength: { value: 6, message: "username is min 6 character" },
              maxLength: {
                value: 50,
                message: "username is max 50 character",
              },
            }}
            defaultValue=""
          />
          <Text style={{ color: "white" }}>{errors.username?.message}</Text>
          <Text style={{ color: "white", marginBottom: 10 }}> Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ position: "relative" }}>
                <Input
                  style={{
                    height: 30,
                    backgroundColor: "white",
                    fontSize: 12,
                    borderRadius: 4,
                    paddingLeft: 20,
                    paddingRight: 30,
                    position: "relative",
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type="password"
                  placeholder="******"
                />
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Image
                    alt="No image"
                    source={require("../../assets/Button.png")}
                    style={{ width: 36, height: 32 }}
                  />
                </TouchableOpacity>
              </View>
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
          <Text style={{ color: "white" }}>{errors.password?.message}</Text>
        </View>

        <View
          style={{
            // position: "absolute",
            paddingLeft: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "transparent",
            marginTop: "-10%",
            bottom: -20,
          }}
        >
          <TouchableOpacity
            style={{ bottom: 9, right: 10 }}
            // onPress={handleGoogleLogin}
          >
            <Image
              alt="No image"
              source={require("../../assets/Google.png")}
              style={{ width: 36, height: 36 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ bottom: 9, right: 10 }}
            onPress={handleFacebookLogin}
          >
            <Image
              alt="No image"
              source={require("../../assets/Facebook.png")}
              style={{ width: 36, height: 36 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ bottom: 9, right: 10 }}>
            <Image
              alt="No image"
              source={require("../../assets/Apple.png")}
              style={{ width: 36, height: 36 }}
            />
          </TouchableOpacity>
        </View>
        {/* <AntDesign size={30} color="#900" /> */}
      </View>
      <TouchableOpacity
        style={{ position: "absolute", top: "5%", left: "4%", zIndex: 10 }}
        onPress={() => {
          navigation.navigate("ROOT");
        }}
      >
        <AntDesign
          name="arrowleft"
          size={30}
          color="white"
          style={{ position: "absolute", top: "5%", left: "4%" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Signin;
