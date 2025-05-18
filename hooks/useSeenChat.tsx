import { seenMessage } from "@/firebase/functions";
import { useUserStore } from "@/states/user";
import { useEffect } from "react";

function useSeenChat(chatId: string) {
    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            return;
        }

        async function handleSeenMessage() {
            await seenMessage({ chatId });
        }

        return () => {
            handleSeenMessage();
        };
    }, [user]);
}

export default useSeenChat;
