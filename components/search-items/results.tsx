import { FlatList, View } from "react-native";
import CatalogueItem from "./catalogue-item";
import {
    useInfiniteHits,
    UseInfiniteHitsProps,
} from "react-instantsearch-core";
import { ItemType } from "@/types/item";
import NoSearchResults from "./no-search-results";

interface PropsInterface {
    listRef: React.RefObject<FlatList>;
}

export default function SearchResults(
    props: PropsInterface & UseInfiniteHitsProps,
) {
    const { listRef, ...infiniteHitProps } = props;
    const { items, isLastPage, showMore } = useInfiniteHits(infiniteHitProps);
    const fetchedItems = items as unknown as ItemType[];

    return (
        <View className="relative flex-1">
            {items.length === 0 && <NoSearchResults />}
            <FlatList
                ref={listRef}
                data={fetchedItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="flex justify-start gap-2 px-2 pt-2 pb-6"
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
