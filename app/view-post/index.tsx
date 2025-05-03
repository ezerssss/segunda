import { useEffect, useState } from "react";
import useGetPostItems from "@/hooks/useGetPostItems";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ItemType } from "@/types/item";
import { ScrollView } from "react-native";
import ItemCard from "./item";

export default function ViewPostPage() {
    const [postItems, setPostItems] = useState<ItemType[]>();
    const { getPostItems } = useGetPostItems();
    const postId = "QIVLNrekTikDeSO1yLfa";

    function onResult(
        itemsQuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot,
    ) {
        const items: ItemType[] = [];
        itemsQuerySnapshot.forEach((itemDoc) => {
            const data = {
                id: itemDoc.id,
                ...itemDoc.data(),
            } as ItemType;
            items.push(data);
        });
        setPostItems(items);
    }

    function onError() {
        console.error("Failed getting post items");
    }
    useEffect(() => {
        const unsubsribe = getPostItems(postId, onResult, onError);
        return unsubsribe;
    }, [getPostItems, postItems, setPostItems]);

    function renderItems() {
        return postItems?.map((item, index) => (
            <ItemCard key={item.id + index} {...item} />
        ));
    }

    return (
        <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            {renderItems()}
        </ScrollView>
    );
}
