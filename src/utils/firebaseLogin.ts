import app from "./firebaseConfig"
import { getAuth, FacebookAuthProvider, signInWithCredential } from "firebase/auth"
import { AccessToken, LoginManager } from "react-native-fbsdk-next"

export const signInWithFb = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
        if (result.isCancelled) throw new Error("User cancelled login!")
        const data = await AccessToken.getCurrentAccessToken()
        if (!data) throw new Error("Something wrong obtaining access token!")
        const credential = FacebookAuthProvider.credential(data.accessToken)
        const auth = getAuth(app)
        const user = await signInWithCredential(auth, credential)
        return user
    } catch (error) {
        console.error(error)
        LoginManager.logOut()
    }
}

// export const signInWithFb2 = async () => {
//     try {
//         const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
//         if (result.isCancelled) throw new Error("User cancelled login!")
//         const data = await AccessToken.getCurrentAccessToken()
//         if (!data) throw new Error("Something wrong obtaining access token!")
//         const credential = auth.FacebookAuthProvider.credential(data.accessToken)
//         const user = await auth().signInWithCredential(credential)
//         console.log(user)
//         return user
//     } catch (error) {
//         console.error(error)
//     }
// }
