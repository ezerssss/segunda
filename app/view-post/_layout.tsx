import { Stack } from "expo-router";
import { useState } from "react";
import "react-native-reanimated";
import { PostContext } from "@/contexts/postContext";
import { ItemType } from "@/types/item";
import { PostType } from "@/types/post";

export default function RootLayout() {
    const [postItems, setPostItems] = useState<ItemType[]>([]);
    const [post, setPost] = useState<PostType | undefined>({} as PostType);

    return (
        <PostContext.Provider
            value={{ postItems, setPostItems, post, setPost }}
        >
            <Stack screenOptions={{ headerShown: false }} />
        </PostContext.Provider>
    );
}
