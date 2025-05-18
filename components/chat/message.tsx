import { View, Text } from "react-native";

interface PropsInterface {
    message: string;
    imageUrl: string | null;
    senderName: string;
    senderImageUrl: string | null;
    date: string;
}

export default function Message(props: PropsInterface) {
    const { message } = props;

    return (
        <View className="mb-4">
            <Text>{message}</Text>
        </View>
    );
}
