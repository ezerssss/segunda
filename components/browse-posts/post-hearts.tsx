import { Icon, Text } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";

interface PostHeartsProps {
    hearts?: number;
}

function PostHearts(props: PostHeartsProps) {
    const { hearts = 0 } = props;
    return (
        <View className="mt-2 flex flex-row justify-center space-y-2">
            <TouchableOpacity>
                <Icon name="heart-outline" pack="eva" width={20} height={20} />
            </TouchableOpacity>
            <Text
                appearance="hint"
                category="s1"
                style={{ marginLeft: 8, color: "black" }}
            >
                {hearts} hearts
            </Text>
        </View>
    );
}

export default PostHearts;
