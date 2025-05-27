import SellerItem from "@/components/seller/seller-items";
import useGetSellerItems from "@/hooks/useGetSellerItems";
import { FlatList, View } from "react-native";
import { Text } from "@ui-kitten/components";
import EmptyList from "@/components/empty-list";

function SellerItemsPage() {
    const { items } = useGetSellerItems();

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <SellerItem key={item.id} sellerItem={item} />;
            }}
            initialNumToRender={5}
            ListEmptyComponent={
                <View className="mt-[28%] h-[350px] items-center justify-center">
                    <EmptyList
                        iconName="shopping-bag-outline"
                        description="You don’t have any items to sell right now. Try adding one to get started."
                    />
                </View>
            }
            ListHeaderComponent={
                <Text className="bg-white px-2 py-4 text-[20px] font-bold">
                    My Items
                </Text>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
            className="bg-white pb-2 pl-2 pr-2"
        />
    );
}

export default SellerItemsPage;
