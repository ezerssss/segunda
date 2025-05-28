import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import SearchBar from "@/components/search-items/search-bar";
import React, { useRef, useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import SearchResults from "@/components/search-items/results";
import { FlatList } from "react-native-gesture-handler";
import { REQUIRED_FILTER } from "@/constants/search";

export default function SearchItemsPage() {
    const listRef = useRef<FlatList>(null);
    const [filter, setFilter] = useState(REQUIRED_FILTER);

    function scrollToTop() {
        listRef.current?.scrollToOffset({ animated: false, offset: 0 });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
                <InstantSearch
                    searchClient={searchClient}
                    indexName={ALGOLIA_INDEX_NAME}
                    future={{
                        preserveSharedStateOnUnmount: true,
                    }}
                >
                    <Configure filters={filter} />
                    <SearchBar onChange={scrollToTop} />
                    <SearchResults
                        listRef={listRef}
                        onChange={(filterString) => setFilter(filterString)}
                    />
                </InstantSearch>
            </View>
        </TouchableWithoutFeedback>
    );
}
