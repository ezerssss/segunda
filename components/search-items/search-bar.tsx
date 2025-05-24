import { Icon, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-core";

export default function SearchBar(props: UseSearchBoxProps) {
    const { query, refine } = useSearchBox(props);
    const inputRef = useRef<Input>(null);
    const [inputValue, setInputValue] = useState(query);

    function setQuery(newQuery: string) {
        setInputValue(newQuery);
        refine(newQuery);
    }

    return (
        <View className="mx-2 my-4 flex-row items-center gap-2">
            <Pressable onPress={() => router.back()}>
                <Icon name="arrow-ios-back-outline" />
            </Pressable>
            <Input
                ref={inputRef}
                placeholder={"What item are you looking for?"}
                className="rounded-3xl"
                style={{ flexGrow: 1 }}
                textStyle={{
                    marginLeft:
                        !!inputValue || inputRef.current?.isFocused() ? 20 : 0,
                }}
                accessoryLeft={
                    inputValue.length === 0 &&
                    !inputRef.current?.isFocused() ? (
                        <Icon name="search-outline" />
                    ) : (
                        <></>
                    )
                }
                value={inputValue}
                onChangeText={setQuery}
                clearButtonMode="while-editing"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                autoComplete="off"
            />
        </View>
    );
}
