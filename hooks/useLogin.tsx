import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import {
    GoogleSignin,
    isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import auth from "@/firebase/auth";
import {
    GoogleAuthProvider,
    signInWithCredential,
} from "@react-native-firebase/auth";
import getErrorStatus from "../utils/getErrorStatus";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isInternalError, setIsInternalError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user);
        });

        return unsubscribe;
    }, []);

    async function handleShowError() {
        setIsError(true);

        setTimeout(() => {
            setIsError(false);
        }, 2000);
    }

    async function handleLogin() {
        try {
            setIsLoading(true);
            await GoogleSignin.signOut();
            await GoogleSignin.hasPlayServices();
            const res = await GoogleSignin.signIn();

            if (!isSuccessResponse(res)) {
                throw new Error("Sign in was cancelled by user");
            }

            const { idToken } = res.data;
            const googleCredential = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredential);
            router.back(); //change this later to route to proper screen/page
        } catch (error) {
            const status = getErrorStatus(error?.message);
            if (status === "INVALID_ARGUMENT") {
                setIsInternalError(true);
                handleShowError();
            } else if (status === "INTERNAL") {
                handleShowError();
            }

            // console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading, isInternalError, isError };
}

export default useLogin;
