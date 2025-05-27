import CatalogueItem from "@/components/search-items/catalogue-item";
import { FlatList, View } from "react-native";
import {
    Configure,
    InstantSearch,
    useInfiniteHits,
    UseInfiniteHitsProps,
} from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import { ItemType } from "@/types/item";
import { Text } from "@ui-kitten/components";
import { useState } from "react";
import { REQUIRED_FILTER } from "@/constants/search";
import FiltersAndSorts from "@/components/filter";

export default function CataloguePage() {
    const [filter, setFilter] = useState(REQUIRED_FILTER);

    return (
        <View className="flex-1">
            <InstantSearch
                searchClient={searchClient}
                indexName={ALGOLIA_INDEX_NAME}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
            >
                <Configure filters={filter} />
                <CatalogueList
                    onChange={(filterString) => setFilter(filterString)}
                />
            </InstantSearch>
        </View>
    );
}

interface PropsInterface {
    onChange: (filterString: string) => void;
}

function CatalogueList(props: PropsInterface & UseInfiniteHitsProps) {
    const { onChange, ...infiniteHitProps } = props;
    const { items, isLastPage, showMore } = useInfiniteHits(infiniteHitProps);
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
                ListHeaderComponent={<FiltersAndSorts onChange={onChange} />}
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
