import { createContext, useContext } from "react";
import { ItemType } from "@/types/item";
import { PostType } from "@/types/post";

interface PostContextType {
    postItems: ItemType[];
    setPostItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    post: PostType;
    setPost: React.Dispatch<React.SetStateAction<PostType>>;
}

export const PostContext = createContext<PostContextType | undefined>(
    undefined,
);

export function usePostContext() {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error(
            "usePostContext must be used within a PostContext.Provider",
        );
    }
    return context;
}
