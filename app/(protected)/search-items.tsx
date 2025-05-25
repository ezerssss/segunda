import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import SearchBar from "@/components/search-items/search-bar";
import React, { useRef } from "react";
import { Configure, InstantSearch } from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import SearchResults from "@/components/search-items/results";
import { FlatList } from "react-native-gesture-handler";

export default function SearchItemsPage() {
    const listRef = useRef<FlatList>(null);

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
                    <Configure filters="isDeleted:false" />
                    <SearchBar onChange={scrollToTop} />
                    <SearchResults listRef={listRef} />
                </InstantSearch>
            </View>
        </TouchableWithoutFeedback>
    );
}
