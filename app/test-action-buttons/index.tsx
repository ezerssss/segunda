import { View } from "react-native";
import ActionButtons from "@/components/action-buttons/action-buttons";
import { useEffect, useState } from "react";
import { ItemType } from "@/types/item";
import { collection, query, getDocs } from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";

function TestActionButtonPage() {
    const [item, setItem] = useState<ItemType>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getItems = async () => {
            try {
                const q = query(collection(db, "items"));
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs[0].id, querySnapshot.docs);
                if (querySnapshot.docs.length >= 1) {
                    const parsedItem = querySnapshot.docs[0].data() as ItemType;
                    setItem((i) => parsedItem);
                    console.log("happening here!!!");
                }
                console.log("the item is: ", item);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };
        getItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View className="flex-1 items-center justify-center bg-white">
            {isLoading ? (
                <View></View>
            ) : (
                <View className="w-full flex-row">
                    {item && <ActionButtons item={item}></ActionButtons>}
                </View>
            )}
        </View>
    );
}

export default TestActionButtonPage;
