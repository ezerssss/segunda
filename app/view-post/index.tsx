import { useEffect } from "react";
import useGetPostItems from "@/hooks/useGetPostItems";

export default function ViewPostPage() {
    const { getPostItems } = useGetPostItems();
    const postId = "QIVLNrekTikDeSO1yLfa";

    function onResult() {
        console.log("Successfully got post items");
    }

    function onError() {
        console.error("Failed getting post items");
    }
    useEffect(() => {
        const unsubsribe = getPostItems(postId, onResult, onError);
        return unsubsribe;
    }, [getPostItems]);
}
