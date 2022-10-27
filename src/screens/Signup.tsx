import { useEffect, useState } from "react"
import { Box, Button, Input, VStack, FormControl, Stack, Icon, Image, Text, HStack, useToast } from "native-base"
import { Feather, MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import { signInWithFb } from "../utils/firebaseLogin"
import * as Google from "expo-auth-session/providers/google"
import axios from "axios"
import { TCredential } from "../__types__/credential.type"
import { API_URL, GOOGLE_EXPO_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "react-native-dotenv"
import { useAuth } from "../context/AuthContext"

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
            const res = await axios.post("http://localhost:9000/auth/signup", { type: "normal", payload: data })
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    // login facebook
    const handleFacebookLogin = async () => {
        try {
            const user = await signInWithFb()
            if (!user) return
            const data = {
                type: "facebook",
                payload: { fbEmail: user.user.email, fbName: user.user.displayName, fbAvatar: user.user.photoURL },
            }
            const res = await axios.post("http://localhost:9000/auth/signin", data)
            const { accessToken } = res.data
            await signIn(accessToken)
        } catch (error) {
            console.error(error)
        }
    }

    // GG signin
    const [ggUser, setGgUser] = useState<any>()
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: GOOGLE_EXPO_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    })
    useEffect(() => {
        const getGgUser = async () => {
            if (response?.type === "success") {
                const accessToken = response.authentication.accessToken
                const user = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                })
                setGgUser(user.data)
                await handleGoogleLogin(user.data)
            }
        }
        getGgUser()
    }, [response])

    // handle google sign in
    const handleGoogleLogin = async (ggUser: any) => {
        try {
            const data = {
                type: "google",
                payload: { ggEmail: ggUser.email, ggName: ggUser.name, ggAvatar: ggUser.picture },
            }
            const res = await axios.post("http://localhost:9000/auth/signin", data)
            const { accessToken } = res.data
            await signIn(accessToken)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box w="full" h="full" top="0" px="6" position="absolute" justifyContent="center" bgColor="muted.50">
            <Image alignSelf="center" source={require("../../assets/logo.png")} size="150" alt="logo" />

            <VStack space="5">
                <Stack space="2">
                    <FormControl isRequired isInvalid={"username" in errors}>
                        <FormControl.Label>User name</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="zuno"
                                    InputLeftElement={<Icon as={Feather} name="user" ml="2" color="purple.500" />}
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
                        <FormControl.ErrorMessage>{errors.username?.message}</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={"password" in errors}>
                        <FormControl.Label>Password</FormControl.Label>
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
                                maxLength: { value: 50, message: "Password is max 50 character" },
                            }}
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>{errors.password?.message}</FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
                <HStack alignItems="center" justifyContent="space-between">
                    <Text>Do you have an account?</Text>
                    <Button onPress={() => navigation.navigate("SIGN IN")} variant="ghost" colorScheme="success">
                        Sign In
                    </Button>
                </HStack>
                <VStack space="4">
                    <Button onPress={handleSubmit(onSubmit)} colorScheme="green">
                        SIGN UP
                    </Button>
                    <Button
                        onPress={handleFacebookLogin}
                        leftIcon={<Entypo name="facebook" size={24} color="white" />}
                        colorScheme="blue"
                    >
                        Facebook
                    </Button>
                    <Button
                        onPress={() => promptAsync({ showInRecents: true })}
                        leftIcon={<AntDesign name="google" size={24} color="white" />}
                        colorScheme="red"
                    >
                        Google
                    </Button>
                    {ggUser && (
                        <Stack>
                            <Text>email: {ggUser.email}</Text>
                            <Text>name: {ggUser.name}</Text>
                            <Image src={ggUser.picture} size="150" />
                        </Stack>
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}

export default Signup
