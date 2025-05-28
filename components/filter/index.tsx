import { View, ScrollView } from "react-native";
import Filters from "./filter";
import PriceRange from "./price";
import SortBy from "./sort";
import { useEffect, useState } from "react";
import { generateFilterString } from "@/utils/search";

interface PropsInterface {
    onChange: (filterString: string) => void;
}

function FiltersAndSorts(props: PropsInterface) {
    const { onChange } = props;
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(1000000);

    useEffect(() => {
        const filterString = generateFilterString({
            lowerBound,
            upperBound,
            tags: activeTags,
        });
        onChange(filterString);
    }, [activeTags, lowerBound, upperBound, onChange]);

    return (
        <View className="h-10 w-full flex-row items-center">
            <ScrollView
                horizontal
                contentContainerClassName="px-3 gap-2"
                showsHorizontalScrollIndicator={false}
            >
                <SortBy />
                <PriceRange
                    setLowerBound={setLowerBound}
                    setUpperBound={setUpperBound}
                />
                <Filters
                    activeTags={activeTags}
                    setActiveTags={setActiveTags}
                />
            </ScrollView>
        </View>
    );
}

export default FiltersAndSorts;
