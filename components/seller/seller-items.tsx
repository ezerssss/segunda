import { View, TouchableOpacity, ToastAndroid } from "react-native";
import { Text, OverflowMenu, MenuItem, IndexPath } from "@ui-kitten/components";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import ConfirmCancelModal from "../confirm-cancel-modal";
import { deleteItem } from "@/firebase/functions";
import { DeleteItemRequestType, ItemType } from "@/types/item";
import useResetStore from "@/hooks/useResetStore";

interface SellerItemProps {
    sellerItem: ItemType;
}

export default function SellerItem(props: SellerItemProps) {
    const { sellerItem } = props;
    const { id, name, imageUrl, price, blurHash, description, postId, index } =
        sellerItem;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>();
    const { resetPostStore } = useResetStore();
    const [isDeleting, setIsDeleting] = useState(false);

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
        setIsDeleting(true);
        try {
            await deleteItem(data);
            ToastAndroid.show("Item deleted.", ToastAndroid.SHORT);
        } catch (error) {
            console.error("Failed deleting item: ", error);
        } finally {
            setIsDeleting(false);
            setIsModalVisible(false);
            setSelectedIndex(undefined);
        }
    }

    function navigateToPost() {
        resetPostStore();
        router.push(`/(protected)/view-post/${postId}?index=${index}`);
    }

    return (
        <TouchableOpacity className="flex p-2" onPress={navigateToPost}>
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
                        ₱ {Number(price).toLocaleString("en-PH")}
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
                isLoading={isDeleting}
                onConfirm={() =>
                    handleDeleteItem({ itemId: id } as DeleteItemRequestType)
                }
            />
        </TouchableOpacity>
    );
}
