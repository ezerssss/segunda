import { Avatar, Text } from "@ui-kitten/components";
import { View, ImageBackground } from "react-native";

interface UserHeaderProps {
    imageUrl?: string | null;
    name?: string | null;
}

function UserHeader(props: UserHeaderProps) {
    const { imageUrl, name } = props;

    return (
        <View className="flex-row items-center gap-4 py-4">
            <Avatar
                source={{ uri: imageUrl ?? "" }}
                ImageComponent={ImageBackground}
                size="large"
            />
            <View>
                <Text category="h6">{name ?? ""}</Text>
                <Text category="c1">{new Date().toLocaleDateString()}</Text>
            </View>
        </View>
    );
}

export default UserHeader;
