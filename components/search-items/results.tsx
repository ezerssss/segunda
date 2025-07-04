import { FlatList, View } from "react-native";
import CatalogueItem from "./catalogue-item";
import {
    useInfiniteHits,
    UseInfiniteHitsProps,
} from "react-instantsearch-core";
import { ItemType } from "@/types/item";
import EmptyList from "@/components/empty-list";
import FiltersAndSorts from "../filter";

interface PropsInterface {
    listRef: React.RefObject<FlatList>;
    onChange: (filterString: string) => void;
}

export default function SearchResults(
    props: PropsInterface & UseInfiniteHitsProps,
) {
    const { listRef, onChange, ...infiniteHitProps } = props;
    const { items, isLastPage, showMore } = useInfiniteHits(infiniteHitProps);
    const fetchedItems = items as unknown as ItemType[];

    return (
        <View className="relative flex-1">
            {items.length === 0 && (
                <EmptyList
                    iconName="search-outline"
                    description="We cannot find the item you are looking for, maybe try
                        changing your search query"
                />
            )}
            <FlatList
                ref={listRef}
                data={fetchedItems}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="flex justify-start gap-2 px-2 pb-6"
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    gap: 4,
                }}
                ListHeaderComponent={<FiltersAndSorts onChange={onChange} />}
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
