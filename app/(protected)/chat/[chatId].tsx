import Message from "@/components/chat/message";
import NewMessage from "@/components/chat/new-message";
import UserHeader from "@/components/user/user-header";
import { Icon, Divider } from "@ui-kitten/components";
import { router } from "expo-router";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";

function ChatInstancePage() {
    const data: number[] = new Array(15).fill(0).map((_, idx) => idx);

    return (
        <>
            <View className="flex-row items-center justify-between px-3 py-4">
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={router.back}>
                        <Icon name="arrow-ios-back-outline" />
                    </TouchableOpacity>
                    <UserHeader
                        name="Ezra Magbanua"
                        imageUrl="https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg"
                        campus="Miagao Campus"
                    />
                </View>
            </View>
            <Divider />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 px-4"
            >
                <FlatList
                    inverted
                    data={data}
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Message
                            message="Hello world "
                            imageUrl={
                                index % 2 === 0
                                    ? "https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962.jpg"
                                    : null
                            }
                            isOther={index % 3 === 0}
                            senderImageUrl="https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg"
                            date={new Date().toISOString()}
                        />
                    )}
                />

                <NewMessage />
            </KeyboardAvoidingView>
        </>
    );
}

export default ChatInstancePage;
