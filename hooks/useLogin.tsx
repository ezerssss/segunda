import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
    webClientId:
        "856598904366-71ebnp3j3e3fdq4vtjv0pa85ccm2rkck.apps.googleusercontent.com",
});

WebBrowser.maybeCompleteAuthSession();

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        try {
            setIsLoading(true);

            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const res = await GoogleSignin.signIn();

            const idToken = res.data?.idToken;
            if (!idToken) {
                throw new Error("Id token not found.");
            }

            const googleCredential =
                auth.GoogleAuthProvider.credential(idToken);

            const signInRes =
                await auth().signInWithCredential(googleCredential);
            console.log(signInRes);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}

export default useLogin;
