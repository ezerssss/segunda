import CatalogueItem from "@/components/search-items/catalogue-item";
import { FlatList, View } from "react-native";
import {
    Configure,
    InstantSearch,
    useInfiniteHits,
} from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import { ItemType } from "@/types/item";
import { Text } from "@ui-kitten/components";
import Filters from "@/components/filter/filter";
import SortBy from "@/components/filter/sort";
import PriceRange from "@/components/filter/price";

export default function CataloguePage() {
    return (
        <View className="flex-1">
            <View className="mt-3 flex-row gap-2 px-3">
                <SortBy />
                <PriceRange />
                <Filters />
            </View>
            <InstantSearch
                searchClient={searchClient}
                indexName={ALGOLIA_INDEX_NAME}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
            >
                <Configure filters="isDeleted:false AND isSold:false" />
                <CatalogueList />
            </InstantSearch>
        </View>
    );
}

function CatalogueList() {
    const { items, isLastPage, showMore } = useInfiniteHits();
    const fetchedItems = items as unknown as ItemType[];

    return (
        <View className="relative flex-1">
            {items.length === 0 && (
                <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Text appearance="hint">No Items available</Text>
                </View>
            )}
            <FlatList
                data={fetchedItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="flex justify-start gap-2 px-3 pb-6 pt-3"
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
