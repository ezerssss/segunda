import {
    doc,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/contexts/postContext";
import { PostType } from "@/types/post";
import { postsCollectionRef } from "@/constants/collections";

export function useGetPost(postId: string) {
    const { setPost } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubsribe = onSnapshot(
            doc(postsCollectionRef, postId),
            (postDocSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
                if (postDocSnapshot.exists) {
                    setPost(postDocSnapshot.data() as PostType);
                } else {
                    console.error("Failed getting post");
                }
                setIsLoading(false);
            },
            (error) => console.error("Error in getting post: ", error),
        );

        return unsubsribe;
    }, []);

    return { isLoading };
}

export default useGetPost;
