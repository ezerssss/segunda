import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import SearchBar from "@/components/search-items/search-bar";
import React from "react";
import { InstantSearch } from "react-instantsearch-core";
import { ALGOLIA_INDEX_NAME } from "@/constants/algolia";
import { searchClient } from "@/algolia";
import SearchResults from "@/components/search-items/results";

export default function SearchItemsPage() {
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
                    <SearchBar />
                    <SearchResults />
                </InstantSearch>
            </View>
        </TouchableWithoutFeedback>
    );
}
