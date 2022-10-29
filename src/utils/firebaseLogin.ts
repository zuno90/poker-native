import auth from "@react-native-firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { GOOGLE_FIREBASE_WEBCLIENT_ID } from "react-native-dotenv";

GoogleSignin.configure({
  webClientId:
    GOOGLE_FIREBASE_WEBCLIENT_ID ?? "346689803663-cqemermkk3fk8rnlvcfg5vksf9n463pk.apps.googleusercontent.com"
});

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
    }
  }
};
