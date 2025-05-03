import { itemsCollectionRef } from "@/constants/collections";
import {
    onSnapshot,
    Unsubscribe,
    query,
    where,
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export function useGetPostItems() {
    function getPostItems(
        postId: string,
        onSnapshotCallback: (
            snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
        ) => void,
        onError: (error: Error) => void,
    ): Unsubscribe {
        const itemsQuery = query(
            itemsCollectionRef,
            where("postId", "==", postId),
        );

        return onSnapshot(itemsQuery, onSnapshotCallback, onError);
    }

    return { getPostItems };
}

export default useGetPostItems;
