import {
    View,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import SearchBar from "@/components/search-items/search-bar";
import React, { useEffect, useState } from "react";
import { ItemType } from "@/types/item";
import CatalogueItem from "@/components/search-items/catalogue-item";
import NoSearchResults from "@/components/search-items/no-search-results";

export default function SearchItems() {
    const [searchQuery, setSearchQuery] = useState("");

    const [mockItemsData, setMockItemsData] = useState<ItemType[]>([]);

    useEffect(() => {
        const tempArr: ItemType[] = [];
        for (let index = 0; index < searchQuery.length; index++) {
            tempArr.push({ ...mockItem, id: index.toString() });
        }
        setMockItemsData(tempArr);
    }, [searchQuery]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                {mockItemsData.length === 0 && <NoSearchResults />}
                <FlatList
                    data={mockItemsData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerClassName="flex justify-start gap-2 p-2"
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        gap: 4,
                    }}
                    renderItem={({ item, index }) => {
                        return <CatalogueItem key={item.id} item={item} />;
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const mockItem: ItemType = {
    blurHash: "ULF=w8NLSg9E_NMwbbozIpITV@xux^ozMwkC",
    confirmedBidder: null,
    isSold: false,
    dateCreated: "2025-05-17T11:34:50.017Z",
    dateUpdated: "2025-05-17T11:41:24.782Z",
    description: "For hs projects",
    id: "wJUfZSgmHUEcGYD1yIOl",
    imageUrl: "https://picsum.photos/300",
    index: 0,
    isDeleted: false,
    miner: null,
    name: "Chips Packets",
    postId: "5EW84BiH9zzBpsGrySxw",
    price: 10,
    sellerData: {
        campus: "Miagao Campus",
        email: "jrolana@up.edu.ph",
        imageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocKJKCt1ikqlpCr15YedT8xGZPovZkLt_Y-RMCNevAug-bdKHbI=s96-c",
        name: "Jhoanna Olana",
        isSetup: true,
    },
    sellerId: "qMf5HlRlg4NZmNnBssa78zwozmq1",
    tags: ["Clothes", "Shoes"],
};
