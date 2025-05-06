import { View } from "react-native";
import { Text, Avatar } from "@ui-kitten/components";

interface BidderDetailsProps {
    imgURI: string;
    bid: number;
    date: string;
    name: string;
}

function BidderDetails(props: Readonly<BidderDetailsProps>) {
    const { imgURI, bid, date, name } = props;
    return (
        <View className="flex-row items-center">
            <Avatar source={{ uri: imgURI }} size="large" />
            <View className="ml-3 flex-col">
                <Text category="h5">{name}</Text>
                <Text category="s1">PHP {bid}</Text>
                <Text category="s2">{date}</Text>
            </View>
        </View>
    );
}

export default BidderDetails;
