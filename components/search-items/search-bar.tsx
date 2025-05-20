import { Icon, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { Pressable, View } from "react-native";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchBar(props: Readonly<SearchBarProps>) {
    const { searchQuery, setSearchQuery } = props;
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View className="mx-2 my-4 flex-row items-center gap-2">
            <Pressable onPress={() => router.back()}>
                <Icon name="arrow-ios-back-outline" />
            </Pressable>
            <Input
                placeholder={"What item are you looking for?"}
                className="rounded-3xl"
                style={{ flexGrow: 1 }}
                textStyle={{ marginLeft: searchQuery || isFocused ? 20 : 0 }}
                accessoryLeft={
                    searchQuery.length === 0 && !isFocused ? (
                        <Icon name="search-outline" />
                    ) : (
                        <></>
                    )
                }
                value={searchQuery}
                onChangeText={(value) => {
                    setSearchQuery((sq) => value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}
