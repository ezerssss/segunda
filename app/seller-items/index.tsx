import SellerItem from "@/components/seller/seller-items";
import useGetSellerItems from "@/hooks/useGetItems";
import { FlatList, View, ActivityIndicator } from "react-native";
import { Text } from "@ui-kitten/components";

function SellerItemsPage() {
    const { items, fetchMoreItems } = useGetSellerItems();

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
                onEndReached={fetchMoreItems}
                ListEmptyComponent={
                    <View className="min-h-screen flex-1 items-center justify-center bg-white">
                        <ActivityIndicator />
                    </View>
                }
                className="bg-white p-4"
            />
        </>
    );
}

export default SellerItemsPage;
