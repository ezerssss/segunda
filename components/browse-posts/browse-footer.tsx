import { Text } from "@ui-kitten/components";

interface BrowserFooterProps {
    isLoading: boolean;
    hasMore: boolean;
}

function BrowserFooter(props: BrowserFooterProps) {
    const { isLoading, hasMore } = props;
    if (isLoading) {
        return (
            <Text className="py-2 text-center text-base text-gray-600">
                Loading...
            </Text>
        );
    }
    if (!hasMore) {
        return (
            <Text className="py-2 text-center text-base text-gray-600">
                No more posts to load
            </Text>
        );
    }
    return null;
}

export default BrowserFooter;
