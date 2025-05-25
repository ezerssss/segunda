import { Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

export default function NoSearchResults() {
    const theme = useTheme();
    return (
        <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <View className="flex items-center justify-center align-middle">
                <View className="p-10">
                    <Icon
                        name="search-outline"
                        fill={theme["color-gray-500"]}
                    />
                    <Text className="m-2 text-center" appearance="hint">
                        We cannot find the item you are looking for, maybe try
                        changing your search query
                    </Text>
                </View>
            </View>
        </View>
    );
}
