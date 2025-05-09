import { createContext } from "react";
import { ItemType } from "@/types/item";
import { PostType } from "@/types/post";

interface PostContextInterface {
    postItems: ItemType[];
    setPostItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    post: PostType | null;
    setPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}

export const PostContext = createContext<PostContextInterface>({
    postItems: [],
    setPostItems: () => {},
    post: null,
    setPost: () => {},
});
