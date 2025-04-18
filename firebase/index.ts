import { getApp, initializeApp } from "@react-native-firebase/app";
import { Platform } from "react-native";

let appId = "";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: appId,
};

if (Platform.OS === "web") {
    appId = process.env.EXPO_PUBLIC_FIREBASE_WEB_APP_ID ?? "";

    initializeApp(firebaseConfig);
} else if (Platform.OS === "android") {
    appId = process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID ?? "";
} else {
    throw new Error(
        `Unsupported platform: ${Platform.OS}. Please ensure your platform is supported.`,
    );
}

const app = getApp();

export default app;
