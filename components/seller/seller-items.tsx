import { View, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

interface SellerItemProps {
    sellerItem: ItemType;
}

export default function SellerItem(props: SellerItemProps) {
    const { sellerItem } = props;
    const { name, imageUrl, price, blurHash, description } = sellerItem;

    return (
        <>
            <View className="mt-4 flex">
                <View className="flex-row">
                    <Image
                        source={{ uri: imageUrl }}
                        className="h-[100px] w-[100px] rounded"
                        contentFit="cover"
                        placeholder={{ blurHash }}
                    />
                    <View className="ml-2">
                        <Text className="capitalize">{name}</Text>
                        <Text category="s2">PHP {price} </Text>
                        <Text category="s3">{description}</Text>
                    </View>
                    <TouchableOpacity className="ml-auto">
                        <Entypo
                            name="dots-three-vertical"
                            size={18}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
