import {
    limit,
    onSnapshot,
    query,
    where,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { PostType } from "@/types/post";
import { postsCollectionRef } from "@/constants/collections";
import { useUserStore } from "@/states/user";
import { usePostStore } from "@/states/post";

export function useGetPost(postId: string) {
    const { user } = useUserStore();
    const { setPost } = usePostStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const postQuery = query(
            postsCollectionRef,
            where("id", "==", postId),
            where("isDeleted", "==", false),
            limit(1),
        );

        const unsubsribe = onSnapshot(
            postQuery,
            (snapshot) => {
                if (!snapshot.empty) {
                    setPost(snapshot.docs[0].data() as PostType);
                } else {
                    console.error("Failed getting post");
                }
                setIsLoading(false);
            },
            (error) => console.error("Error in getting post: ", error),
        );

        return unsubsribe;
    }, [user]);

    return { isLoading };
}

export default useGetPost;
