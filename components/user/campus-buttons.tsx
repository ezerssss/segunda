import { CampusEnum } from "@/enums/campus";
import { Button } from "@ui-kitten/components";
import clsx from "clsx";

interface CampusSelectionButtonsProps {
    campusSelected: string;
    handleSetCampus: (campus: string) => void;
    isLoading: boolean;
}

function CampusSelectionButtons(props: CampusSelectionButtonsProps) {
    const { campusSelected, handleSetCampus, isLoading } = props;
    return CampusEnum.options.map((campus) => {
        return (
            <Button
                key={campus}
                className={clsx(
                    "my-1 grow px-2 py-3",
                    campus !== campusSelected && "border-dashed",
                )}
                disabled={isLoading}
                appearance={campus === campusSelected ? "filled" : "outline"}
                onPress={() => handleSetCampus(campus)}
            >
                {campus}
            </Button>
        );
    });
}

export default CampusSelectionButtons;
