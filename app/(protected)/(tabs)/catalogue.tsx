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
import { useState } from "react";
import { REQUIRED_FILTER } from "@/constants/search";
import FiltersAndSorts from "@/components/filter";
import EmptyList from "@/components/empty-list";

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
        <View className="flex-10 relative">
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
                ListEmptyComponent={
                    <View className="mt-[28%] h-[350px] items-center justify-center">
                        <EmptyList
                            iconName="search-outline"
                            description="No Items available. Try changing the filters to see results"
                        />
                    </View>
                }
            />
        </View>
    );
}
