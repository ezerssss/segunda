import SellerItem from "@/components/seller/seller-items";
import useGetSellerItems from "@/hooks/useGetSellerItems";
import { FlatList, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Image } from "expo-image";

function SellerItemsPage() {
    const { items } = useGetSellerItems();

    return (
        <>
            <Text className="bg-white p-4 text-[25px] font-bold color-black">
                My items
            </Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return <SellerItem key={item.id} sellerItem={item} />;
                }}
                initialNumToRender={5}
                removeClippedSubviews={false}
                ListEmptyComponent={
                    <View className="mt-[40%] h-[350px] items-center justify-center">
                        <Image
                            source={require("../../assets/images/no-items.png")}
                            contentFit="contain"
                            className="aspect-square h-[150px] w-[100%]"
                        />
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 30 }}
                className="bg-white p-2"
            />
        </>
    );
}

export default SellerItemsPage;
