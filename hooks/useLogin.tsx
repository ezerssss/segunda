import { useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        try {
            setIsLoading(true);
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const res = await GoogleSignin.signIn();

            const idToken = res.data?.idToken;
            if (!idToken) {
                throw new Error("Id token not found.");
            }

            const googleCredential = GoogleAuthProvider.credential(idToken);

            const signInRes = await signInWithCredential(
                auth,
                googleCredential,
            );
            console.log(signInRes.user.email);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}

export default useLogin;
