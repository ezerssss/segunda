import { View, TouchableOpacity } from "react-native";
import { Text, OverflowMenu, MenuItem, IndexPath } from "@ui-kitten/components";
import Modal from "react-native-modal";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

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

    return (
        <View className="mt-2 flex p-2">
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
                            className="mt-2 text-[13px] text-gray-500"
                            numberOfLines={2}
                        >
                            {description}
                        </Text>
                    ) : (
                        <Text className="mt-2 text-[13px] text-gray-500">
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
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(false)}
                onBackButtonPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                useNativeDriver={false}
                backdropTransitionOutTiming={1}
                backdropOpacity={0.5}
            >
                <View className="rounded-lg bg-white p-5">
                    <Text className="mb-2 text-lg font-bold">
                        Confirm Delete
                    </Text>
                    <Text className="mb-4 text-gray-600">
                        Are you sure you want to delete this item?
                    </Text>

                    <View className="flex-row justify-end">
                        <TouchableOpacity
                            className="px-3 py-1"
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text className="text-blue-500">Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="px-3 py-1"
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text className="text-red-500">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
