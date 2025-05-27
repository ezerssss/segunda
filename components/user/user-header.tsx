import { formatHeaderDate } from "@/utils/date";
import { Avatar, Icon, Text } from "@ui-kitten/components";
import { View, ImageBackground } from "react-native";

interface UserHeaderProps {
    imageUrl?: string | null;
    name?: string | null;
    date?: Date;
    campus?: string;
}

function UserHeader(props: UserHeaderProps) {
    const { imageUrl, name, date, campus } = props;

    return (
        <View className="flex-row items-center gap-3">
            <Avatar
                source={{ uri: imageUrl ?? "" }}
                ImageComponent={ImageBackground}
                size="large"
            />
            <View className="gap-[1px]">
                <Text category="h6">{name ?? ""}</Text>
                <View className="flex-row items-center gap-2">
                    <View className="flex-row items-center gap-1 rounded-lg border border-gray-200 px-2 py-1">
                        <Icon
                            name="pin-outline"
                            fill="gray"
                            width={14}
                            height={14}
                        />
                        <Text className="text-xs">{campus}</Text>
                    </View>
                    {date && (
                        <Text category="c1" className="text-gray-400">
                            {formatHeaderDate(date)}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

export default UserHeader;
