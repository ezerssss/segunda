import { useEffect, useState } from "react";
import {
    GoogleSignin,
    isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            console.log(user);
        });

        return unsubscribe;
    }, []);

    async function handleLogin() {
        try {
            setIsLoading(true);
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const res = await GoogleSignin.signIn();

            if (isSuccessResponse(res)) {
                console.log(res.data.user);
            } else {
                throw new Error("Sign in was cancelled by user");
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
