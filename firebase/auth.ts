import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import app from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
