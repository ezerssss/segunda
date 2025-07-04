import { useEffect, useState } from "react";

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
import { ERROR_MESSAGE_TIMEOUT } from "@/constants/timeout";
import { useUserStore } from "@/states/user";
import { router } from "expo-router";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
});

function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isInternalError, setIsInternalError] = useState(false);
    const { user } = useUserStore();

    useEffect(() => {
        if (user) {
            setIsLoading(false);
            if (user.isSetup) router.replace("/(protected)/(tabs)/home");
            else router.replace("/(protected)/user-setup?prevRoute=login");
        }
    }, [user]);

    async function handleShowError() {
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
            setIsInternalError(false);
        }, ERROR_MESSAGE_TIMEOUT);
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
        } catch (error) {
            if (error instanceof Error) {
                const status = getErrorStatus(error?.message);
                if (status === "INVALID_ARGUMENT") {
                    handleShowError();
                } else if (status === "INTERNAL") {
                    setIsInternalError(true);
                    handleShowError();
                }
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading, isInternalError, isError };
}

export default useLogin;
