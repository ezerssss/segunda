import { usePostStore } from "@/states/post";

function useResetStore() {
    const { setPost, setPostItems } = usePostStore();

    function resetPostStore() {
        setPost(null);
        setPostItems([]);
    }

    return { resetPostStore };
}

export default useResetStore;
