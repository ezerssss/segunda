import { Stack } from "expo-router";
import { useState } from "react";
import "react-native-reanimated";
import { PostContext } from "@/contexts/postContext";
import { ItemType } from "@/types/item";

export default function RootLayout() {
    const [postItems, setPostItems] = useState<ItemType[]>([]);

    return (
        <PostContext.Provider value={{ postItems, setPostItems }}>
            <Stack screenOptions={{ headerShown: false }} />
        </PostContext.Provider>
    );
}
