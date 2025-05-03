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
        snapshot: FirebaseFirestoreTypes.SnapshotListenOptions,
        error: (
            snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
        ) => void,
    ): Unsubscribe {
        const itemsQuery = query(
            itemsCollectionRef,
            where("postId", "==", postId),
        );
        console.log(itemsQuery);
        return onSnapshot(itemsQuery, snapshot, error);
    }

    return { getPostItems };
}

export default useGetPostItems;
