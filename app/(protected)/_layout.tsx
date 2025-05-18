import { Redirect, Slot } from "expo-router";
import { useUserStore } from "@/states/user";
import { ActivityIndicator, View } from "react-native";
import useGetChatNotif from "@/hooks/useGetChatNotif";

export default function AppLayout() {
    const { user, isUserLoading } = useUserStore();
    useGetChatNotif();

    if (isUserLoading) {
        return (
            <View className="h-screen w-screen items-center justify-center bg-white">
                <ActivityIndicator />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return <Slot />;
}
