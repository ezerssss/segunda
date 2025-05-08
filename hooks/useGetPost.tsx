import {
    doc,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { usePostContext } from "@/contexts/postContext";
import { db } from "@/firebase/db";
import { CollectionEnum } from "@/enums/collection";
import { PostType } from "@/types/post";

export function useGetPost(postId: string) {
    const { setPost } = usePostContext();

    useEffect(() => {
        const unsubsribe = onSnapshot(
            doc(db, CollectionEnum.POSTS, postId),
            (postDocSnapshot: FirebaseFirestoreTypes.DocumentSnapshot) => {
                if (postDocSnapshot.exists) {
                    setPost(postDocSnapshot.data() as PostType);
                } else {
                    console.error("Failed getting post");
                }
            },
            () => console.error("Failed getting post"),
        );
        return unsubsribe;
    }, []);
}

export default useGetPost;
