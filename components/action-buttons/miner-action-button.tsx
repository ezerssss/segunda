import { ItemType } from "@/types/item";
import { Button } from "@ui-kitten/components";

interface MinerActionButtonProp {
    item: ItemType;
}

async function handleMine(item: ItemType) {}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    return (
        <Button
            className="grow"
            onPress={() => {
                handleMine(item);
            }}
        >
            Mine Now!
        </Button>
    );
}

export default MinerActionButton;
