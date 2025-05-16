import { Redirect } from "expo-router";

export default function Root() {
    return <Redirect href="/(protected)/chat/chat-list" />;
    // return <Redirect href="/(protected)/(tabs)/home" />;
}
