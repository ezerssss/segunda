import { Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";

interface PropsInterface {
    iconName: string;
    description: string;
}

export default function EmptyList(props: PropsInterface) {
    const { iconName, description } = props;

    const theme = useTheme();
    return (
        <View className="flex items-center justify-center align-middle">
            <View className="p-10">
                <Icon name={iconName} fill={theme["color-gray-500"]} />
                <Text className="m-2 text-center" appearance="hint">
                    {description}
                </Text>
            </View>
        </View>
    );
}
