import { View, TouchableOpacity, ToastAndroid } from "react-native";
import { Text, OverflowMenu, MenuItem, IndexPath } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import ConfirmCancelModal from "../confirm-cancel-modal";
import { deleteItem } from "@/firebase/functions";
import { DeleteItemRequestType } from "@/types/item";

interface SellerItemProps {
    sellerItem: ItemType;
}

export default function SellerItem(props: SellerItemProps) {
    const { sellerItem } = props;
    const { id, name, imageUrl, price, blurHash, description } = sellerItem;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>();

    const router = useRouter();

    function onMenuTap(index: IndexPath) {
        if (index.row === 0) {
            router.push(`/(protected)/edit-item/${id}`);
        } else if (index.row === 1) {
            setIsModalVisible(true);
        }
        setSelectedIndex(index);
        setIsMenuVisible(false);
    }

    async function handleDeleteItem(data: DeleteItemRequestType) {
        try {
            await deleteItem(data);
            ToastAndroid.show("Item deleted.", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Failed deleting item: ", error);
        } finally {
            setIsModalVisible(false);
            setSelectedIndex(undefined);
        }
    }

    return (
        <View className="flex p-2">
            <View className="flex-row">
                <Image
                    source={{ uri: imageUrl }}
                    className="h-[100px] w-[100px] rounded"
                    contentFit="cover"
                    placeholder={{ blurhash: blurHash }}
                />

                <View className="ml-2 flex-1">
                    <Text className="font-bold capitalize" category="s1">
                        {name}
                    </Text>
                    <Text category="s2" className="text-[14px]">
                        PHP {price}
                    </Text>

                    {description ? (
                        <Text
                            className="text-[13px] text-gray-500"
                            numberOfLines={2}
                        >
                            {description}
                        </Text>
                    ) : (
                        <Text className="text-[13px] text-gray-500">
                            No item description
                        </Text>
                    )}
                </View>

                <OverflowMenu
                    anchor={() => (
                        <TouchableOpacity
                            className="ml-auto"
                            onPress={() => setIsMenuVisible(true)}
                        >
                            <Entypo
                                name="dots-three-vertical"
                                size={18}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                    visible={isMenuVisible}
                    onBackdropPress={() => setIsMenuVisible(false)}
                    onSelect={onMenuTap}
                    selectedIndex={selectedIndex}
                >
                    <MenuItem title="Edit" />
                    <MenuItem title="Delete" />
                </OverflowMenu>
            </View>
            <ConfirmCancelModal
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                icon={<Entypo name="warning" size={30} color="#D32F2F" />}
                title="Confirm Delete"
                body="Are you sure you want to delete this item?"
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
                isDanger={true}
                onConfirm={() =>
                    handleDeleteItem({ itemId: id } as DeleteItemRequestType)
                }
            />
        </View>
    );
}
