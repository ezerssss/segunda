import { Text } from "react-native";
import { Redirect, Slot } from "expo-router";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export default function AppLayout() {
    const { user, isUserLoading } = useContext(UserContext);

    if (isUserLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return <Slot />;
}
