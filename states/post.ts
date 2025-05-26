import { ItemType } from "@/types/item";
import { PostType } from "@/types/post";
import { create } from "zustand";

interface PostStateInterface {
    postItems: ItemType[];
    setPostItems: (data: ItemType[]) => void;
    post: PostType | null;
    setPost: (data: PostType | null) => void;
}

export const usePostStore = create<PostStateInterface>((set) => ({
    postItems: [],
    setPostItems: (data) => set(() => ({ postItems: data })),
    post: null,
    setPost: (data) => set(() => ({ post: data })),
}));
