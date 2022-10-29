import auth from "@react-native-firebase/auth"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { GOOGLE_FIREBASE_WEBCLIENT_ID } from "react-native-dotenv"

GoogleSignin.configure({
    webClientId:
        GOOGLE_FIREBASE_WEBCLIENT_ID ?? "346689803663-cqemermkk3fk8rnlvcfg5vksf9n463pk.apps.googleusercontent.com",
})

export const signInWithFb = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
        if (result.isCancelled) throw new Error("User cancelled login!")
        const data = await AccessToken.getCurrentAccessToken()
        if (!data) throw new Error("Something wrong obtaining access token!")
        const credential = auth.FacebookAuthProvider.credential(data.accessToken)
        const user = await auth().signInWithCredential(credential)
        return user
    } catch (error) {
        console.error(error)
        LoginManager.logOut()
    }
}

export const signInWithGg = async () => {
    try {
        await GoogleSignin.hasPlayServices()
        console.log(await GoogleSignin.hasPlayServices())
        await GoogleSignin.signOut()
        const userInfo = await GoogleSignin.signIn()
        return userInfo
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("cancel sign in")
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log("dang process")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("ko co pay service")
        } else {
            // some other error happened
            console.log(error)
        }
    }
}
