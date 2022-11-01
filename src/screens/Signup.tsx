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
    API_URL,
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
            // console.log("data is", data)
            const res = await axios.post(API_URL + "/auth/signup", { type: "normal", payload: data }).then((respone)=>{
                // console.log(respone.data,"okeee1")
                if(respone.data.success){
                    toast.show({
                        title: "Congratulation !!",
                        description: respone.data.msg,
                        variant: "solid",
                        placement: "top",
                    })
                    axios.post(
                        API_URL + "/auth/signin",
                        {
                            type: "normal",
                            payload: data,
                        }
                    ).then((value)=>{
                       return signIn(value.data.accessToken)
                    })
    
                }else{
                    toast.show({
                        title: "Error !!",
                        description: respone.data.msg,
                        variant: "solid",
                        placement: "top",
                    })
                }
            })
            // console.log(res.data)
            // if (!res.data.success){
         
            // }
        } catch (error) {
            // console.error(error)
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

            </View>


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
