import { useEffect } from "react";
import useGetPostItems from "@/hooks/useGetPostItems";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ItemType } from "@/types/item";
import { ScrollView } from "react-native";
import ItemCard from "../../components/view-post/item-card";
import { usePostContext } from "@/contexts/postContext";

export default function ViewPostPage() {
    const { postItems, setPostItems } = usePostContext();
    const { getPostItems } = useGetPostItems();
    const postId = "QIVLNrekTikDeSO1yLfa";

    useEffect(() => {
        const unsubsribe = getPostItems(
            postId,
            (itemsQuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const items: ItemType[] = [];
                itemsQuerySnapshot.forEach((itemDoc) => {
                    const data = {
                        id: itemDoc.id,
                        ...itemDoc.data(),
                    } as ItemType;
                    items.push(data);
                });
                setPostItems(items);
            },
            () => console.error("Failed getting post items"),
        );
        return unsubsribe;
    }, [getPostItems]);

    function renderItems() {
        const itemsArray = postItems?.sort((a, b) => a.index - b.index);
        return itemsArray?.map((item) => (
            <ItemCard key={item.id + item.index} {...item} />
        ));
    }

    return (
        <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            {renderItems()}
        </ScrollView>
    );
}
