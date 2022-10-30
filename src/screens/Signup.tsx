import { useEffect, useState } from "react"
import { Box, Button, Input, VStack, FormControl, Stack, Icon, Image, Text, HStack, useToast } from "native-base"
import { Feather, MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { StyleSheet, Alert, ImageBackground, TouchableOpacity, View, TextInput } from "react-native"

import { signInWithFb, signInWithGg } from "../utils/firebaseLogin"
import axios from "axios"
import { TCredential } from "../__types__/credential.type"
import {
    API_ANDROID_URL,
    API_IOS_URL,
    API_URL,
    GOOGLE_EXPO_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_FIREBASE_WEBCLIENT_ID,
} from "react-native-dotenv"

const Signup: React.FC = ({ route, navigation }: any) => {
    const { authState, signIn } = useAuth()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TCredential>()
    const toast = useToast()

    // signup normal
    const onSubmit = async (data: TCredential) => {
        try {
            console.log("data is", data)
            const res = await axios.post(API_URL + "/auth/signup", { type: "normal", payload: data })
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    // handle facebook signin
    const handleFacebookLogin = async () => {
        try {
            const user = await signInWithFb()
            if (!user) return
            const data = {
                type: "facebook",
                payload: {
                    fbEmail: user.user.email,
                    fbName: user.user.displayName,
                    fbAvatar: user.user.photoURL,
                },
            }
            const res = await axios.post(
                // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
                API_URL + "/auth/signin",
                data
            )
            const { success, msg, accessToken } = res.data
            if (!success) throw new Error("Bad request!")
            toast.show({
                title: "Login status",
                description: msg,
                variant: "solid",
                placement: "top",
            })
            return signIn(accessToken)
        } catch (error) {
            console.error(error)
            toast.show({
                title: "Login status",
                description: error.message,
                placement: "top",
            })
        }
    }

    // handle google sign in
    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGg()
            if (!user) return
            const data = {
                type: "google",
                payload: {
                    ggEmail: user.user.email,
                    ggName: user.user.name,
                    ggAvatar: user.user.photo,
                },
            }
            const res = await axios.post(
                // Platform.OS === "android" ? API_ANDROID_URL : API_IOS_URL + "/auth/signin",
                API_URL + "/auth/signin",
                data
            )
            const { success, msg, accessToken } = res.data
            if (!success) throw new Error("Bad request!")
            toast.show({
                title: "Login status",
                description: msg,
                variant: "solid",
                placement: "top",
            })
            return signIn(accessToken)
        } catch (error) {
            console.error(error)
            toast.show({
                title: "Login status",
                description: error.message,
                placement: "top",
            })
        }
    }

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
                style={{ position: "absolute", width: "38%", height: "100%", zIndex: 2, bottom: 0, left: -6 }}
            />
            <TouchableOpacity style={{ position: "absolute", top: 30, left: "32%" }}>
                <Image
                    alt="No image"
                    source={require("../../assets/SignUpTitle.png")}
                    style={{ width: 300, height: 50 }}
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
                    width: "36%",
                }}
            >
                {/* <Text style={{ color: "white", top: "-5%" }}>
              Don’t have an account?{"  "}
              <Text
                style={{ textDecorationLine: "underline", color: "white" }}
                onPress={() => {
                  navigation.navigate("Root");
                }}
              >
                Signup now!
              </Text> */}
                {/* </Text> */}
                <View style={{ backgroundColor: "transparent", padding: 10 }}>
                    <Text style={{ color: "white", marginBottom: 10 }}> Account</Text>
                    <TextInput
                        placeholder="User name"
                        // secureTextEntry={true}
                        style={{
                            height: 30,
                            backgroundColor: "white",
                            fontSize: 12,
                            borderRadius: 6,
                            paddingLeft: 20,
                            paddingRight: 30,
                        }}
                    />
                    <Text style={{ color: "white", marginTop: 10, marginBottom: 10 }}> Password</Text>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={{
                            height: 30,
                            backgroundColor: "white",
                            fontSize: 12,
                            borderRadius: 6,
                            paddingLeft: 20,
                            paddingRight: 30,
                            position: "relative",
                        }}
                    />
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ position: "absolute", bottom: 9, right: 10 }}>
                        <Image
                            alt="No image"
                            source={require("../../assets/Button.png")}
                            style={{ width: 30, height: 31 }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        paddingLeft: 10,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        marginTop: "20%",
                    }}
                >
                    <TouchableOpacity style={{ bottom: 9, right: 10 }} onPress={handleGoogleLogin}>
                        <Image
                            alt="No image"
                            source={require("../../assets/Google.png")}
                            style={{ width: 36, height: 36 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ bottom: 9, right: 10 }} onPress={handleFacebookLogin}>
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
            </View>

            {/* <View>
          <p>Account</p>
          <TextInput style={{ backgroundColor: "white", height: 8, borderRadius: 6, paddingLeft: 12, width: 320 }} />
          <p>Password</p>
          <Image
            source={require("../../assets/images/BuronLogin.png")}
            style={{ width: 35, height: 31, position: "absolute", borderRadius: 4, bottom: 0, right: 0 }}
          />


        </View> */}
            {/* <div style={{ backgroundColor: "gray", opacity: 0.5, paddingTop: 1, width: 320, marginTop: 10 }}></div>
        <p style={{ opacity: 0.8, fontSize: 10, marginTop: 0 }}>Or login with</p> */}
            {/* <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "none",
            bottom: "2%",
          }}
        > */}
            {/* <button style={{ borderRadius: "50%", padding: 0 }}     onClick={() => {
            console.log("123");
          }}>
            <Image source={require("../../assets/images/Google.png")} style={{ width: 36, height: 36 }} />
          </button>
          <button style={{ borderRadius: "50%", padding: "0", margin: "0 20p" }}     onClick={() => {
            console.log("123");
          }}>
            <Image source={require("../../assets/images/Facebook.png")} style={{ width: 36, height: 36 }} />
          </button>
          <button style={{ borderRadius: "50%", padding: "0" }}     onClick={() => {
            console.log("123");
          }}>
            <Image source={require("../../assets/images/Apple.png")} style={{ width: 36, height: 36 }} />
          </button> */}
            {/* </View> */}
            <TouchableOpacity
                style={{ position: "absolute", width: 300, height: 300, zIndex: 10 }}
                onPress={() => {
                    navigation.navigate("ROOT")
                }}
            >
                <AntDesign
                    name="arrowleft"
                    size={24}
                    color="white"
                    style={{ position: "absolute", top: "5%", left: "2%" }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Signup
