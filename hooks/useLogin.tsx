import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import auth from "@/firebase/auth";

WebBrowser.maybeCompleteAuthSession();

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    });

    async function handleLogin() {
        try {
            setIsLoading(true);
            const res = await promptAsync();

            if (res.type === "success") {
                const idToken = res.authentication?.idToken;

                if (!idToken) throw new Error("Login failed.");

                const credential = GoogleAuthProvider.credential(idToken);

                const authRes = await signInWithCredential(auth, credential);
                const { user } = authRes;
                console.log(user);
            } else {
                throw new Error("Login failed.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}

export default useLogin;
