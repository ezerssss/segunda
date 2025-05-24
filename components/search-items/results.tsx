import { FlatList, View } from "react-native";
import CatalogueItem from "./catalogue-item";
import {
    useInfiniteHits,
    UseInfiniteHitsProps,
} from "react-instantsearch-core";
import { ItemType } from "@/types/item";
import NoSearchResults from "./no-search-results";

export default function SearchResults(props: UseInfiniteHitsProps) {
    const { items, isLastPage, showMore } = useInfiniteHits(props);
    const fetchedItems = items as unknown as ItemType[];

    return (
        <View className="flex-1">
            {items.length === 0 && <NoSearchResults />}
            <FlatList
                data={fetchedItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="flex justify-start gap-2 p-2"
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    gap: 4,
                }}
                onEndReached={() => {
                    if (!isLastPage) {
                        showMore();
                    }
                }}
                renderItem={({ item }) => {
                    return <CatalogueItem key={item.id} item={item} />;
                }}
            />
        </View>
    );
}
