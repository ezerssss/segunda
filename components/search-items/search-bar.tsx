import { Icon, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-core";

interface PropsInterface {
    onChange: () => void;
}

export default function SearchBar(props: PropsInterface & UseSearchBoxProps) {
    const { onChange, ...searchBoxProps } = props;
    const { query, refine } = useSearchBox(searchBoxProps);
    const inputRef = useRef<Input>(null);
    const [inputValue, setInputValue] = useState(query);

    function setQuery(newQuery: string) {
        setInputValue(newQuery);
        refine(newQuery);
        onChange();
    }

    if (query !== inputValue && !inputRef.current?.isFocused()) {
        setInputValue(query);
    }

    return (
        <View className="mx-2 mb-3 mt-4 flex-row items-center gap-2">
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
