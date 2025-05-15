import { Slot } from "expo-router";
import { useState } from "react";
import { PostContext } from "@/contexts/postContext";
import { ItemType } from "@/types/item";
import { PostType } from "@/types/post";

export default function RootLayout() {
    const [postItems, setPostItems] = useState<ItemType[]>([]);
    const [post, setPost] = useState<PostType | null>(null);

    return (
        <PostContext.Provider
            value={{ postItems, setPostItems, post, setPost }}
        >
            <Slot />
        </PostContext.Provider>
    );
}
