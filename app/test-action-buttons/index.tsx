import { View } from "react-native";
import ActionButtons from "@/components/action-buttons/action-buttons";
import { useEffect, useState } from "react";
import { ItemSchema, ItemType } from "@/types/item";
import { collection, query, getDocs } from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";

function TestActionButtonPage() {
    const [item, setItem] = useState<ItemType>();

    useEffect(() => {
        const getItems = async () => {
            try {
                const q = query(collection(db, "items"));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.docs.length > 1) {
                    const parsedItem = ItemSchema.parse({
                        ...querySnapshot.docs[0].data(),
                    });
                    setItem(parsedItem);
                }
                console.log("the item is: ", item);
            } catch (e) {
                console.log(e);
            }
        };
        getItems();
    }, []);
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full flex-row">
                {item && <ActionButtons item={item}></ActionButtons>}
            </View>
        </View>
    );
}

export default TestActionButtonPage;
