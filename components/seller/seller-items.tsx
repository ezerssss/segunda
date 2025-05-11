import { View, TouchableOpacity } from "react-native";
import { Text, OverflowMenu, MenuItem, IndexPath } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

interface SellerItemProps {
    sellerItem: ItemType;
}

export default function SellerItem({ sellerItem }: SellerItemProps) {
    const { name, imageUrl, price, blurHash, description } = sellerItem;
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    function onMenuTap(index: number) {
        if (index === 0) {
            console.log("Edit tapped");
        } else if (index === 1) {
            console.log("Delete tapped");
        }
        setIsMenuVisible(false);
    }

    return (
        <View className="mt-2 flex p-2">
            <View className="flex-row">
                <Image
                    source={{ uri: imageUrl }}
                    className="h-[100px] w-[100px] rounded"
                    contentFit="cover"
                    placeholder={{ blurHash }}
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
                    anchor={() => {
                        return (
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
                        );
                    }}
                    visible={isMenuVisible}
                    onBackdropPress={() => setIsMenuVisible(false)}
                    onSelect={(index: IndexPath) => onMenuTap(index.row)}
                >
                    <MenuItem title="Edit" />
                    <MenuItem title="Delete" />
                </OverflowMenu>
            </View>
        </View>
    );
}
