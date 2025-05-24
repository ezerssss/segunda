import CatalogueItem from "@/components/search-items/catalogue-item";
import { FlatList, View } from "react-native";
import { InstantSearch, useInfiniteHits } from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import { ItemType } from "@/types/item";

export default function CataloguePage() {
    return (
        <View className="flex-1">
            <InstantSearch
                searchClient={searchClient}
                indexName={ALGOLIA_INDEX_NAME}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
            >
                <CatalogueList />
            </InstantSearch>
        </View>
    );
}

function CatalogueList() {
    const { items, isLastPage, showMore } = useInfiniteHits();
    const fetchedItems = items as unknown as ItemType[];

    return (
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
    );
}
