import { usePostStore } from "@/states/post";
import { useEffect } from "react";

function useResetStore() {
    const { setPost, setPostItems, setScrollPosition } = usePostStore();

    useEffect(() => {
        setPost(null);
        setPostItems([]);
        setScrollPosition(0);
    }, []);
}

export default useResetStore;
