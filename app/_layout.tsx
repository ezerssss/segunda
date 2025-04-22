import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";
import { SegundaTheme } from "@/constants/theme";
import { UserContext } from "../contexts/userContext";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeProvider value={SegundaTheme}>
                <StatusBar style="auto" />
                <SafeAreaView className="flex-1 px-4">
                    <Stack screenOptions={{ headerShown: false }} />
                </SafeAreaView>
            </ThemeProvider>
        </UserContext.Provider>
    );
}
