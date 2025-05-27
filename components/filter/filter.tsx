import { View, Pressable } from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import { PostTagsEnum } from "@/enums/post";
import clsx from "clsx";

interface PropsInterface {
    activeTags: string[];
    setActiveTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function Filters(props: PropsInterface) {
    const { activeTags, setActiveTags } = props;
    const sortedTags = [
        ...activeTags,
        ...PostTagsEnum.options.filter((tag) => !activeTags.includes(tag)),
    ];

    function handleToggle(value: string) {
        const isSelected = activeTags.includes(value);

        if (isSelected) {
            setActiveTags((prev) => prev.filter((tag) => tag !== value));
        } else {
            setActiveTags((prev) => [...prev, value]);
        }
    }

    return (
        <View className="flex-row gap-2">
            {sortedTags.map((tag) => (
                <Pressable
                    key={tag}
                    onPress={() => handleToggle(tag)}
                    className={clsx(
                        "flex-row items-center gap-1 self-start rounded-2xl border px-3 py-1",
                        activeTags.includes(tag)
                            ? "border-gray-500"
                            : "border-gray-200",
                    )}
                >
                    <Text
                        className={clsx(
                            "text-sm",
                            activeTags.includes(tag) && "font-bold",
                        )}
                    >
                        {tag}
                    </Text>
                    {activeTags.includes(tag) && (
                        <Icon name="close" width={15} height={15} />
                    )}
                </Pressable>
            ))}
        </View>
    );
}

export default Filters;
