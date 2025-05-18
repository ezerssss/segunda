import Message from "@/components/chat/message";
import NewMessage from "@/components/chat/new-message";
import { Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";

function ChatInstancePage() {
    const { chatId } = useLocalSearchParams();
    const data: number[] = new Array(100).fill(0).map((_, idx) => idx);

    return (
        <View className="flex-1 px-4">
            <Text>{chatId}</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <FlatList
                    inverted
                    data={data}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Message
                            message="Hello world"
                            imageUrl={null}
                            senderName="Ezra Magbanua"
                            senderImageUrl="https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg"
                            date={new Date().toLocaleString()}
                        />
                    )}
                />

                <NewMessage />
            </KeyboardAvoidingView>
        </View>
    );
}

export default ChatInstancePage;
