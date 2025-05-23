import { View } from "react-native";
import { Text, Avatar } from "@ui-kitten/components";
import { IntlFormatFormatOptions } from "date-fns";

interface BidderDetailsProps {
    imgURI: string;
    bid: number;
    date: string;
    name: string;
}

function BidderDetails(props: Readonly<BidderDetailsProps>) {
    const { imgURI, bid, date, name } = props;
    const formatOptions: IntlFormatFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };
    const formattedDate = Intl.DateTimeFormat("en-us", formatOptions).format(
        new Date(date),
    );

    return (
        <View className="flex-row items-center">
            <Avatar source={{ uri: imgURI }} size="large" />
            <View className="ml-3 flex-col">
                <Text category="h5">PHP {bid}</Text>
                <Text category="s1">{name}</Text>
                <Text category="s2">{formattedDate}</Text>
            </View>
        </View>
    );
}

export default BidderDetails;
