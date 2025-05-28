import { REQUIRED_FILTER } from "@/constants/search";

interface ParamsInterface {
    lowerBound: number;
    upperBound: number;
    tags: string[];
}

export function generateFilterString(params: ParamsInterface): string {
    const { lowerBound, upperBound, tags } = params;
    let resultString = REQUIRED_FILTER;

    // Price range
    resultString += ` AND price:${lowerBound} TO ${upperBound}`;

    if (tags.length === 1) {
        resultString += ` AND tags:${tags[0]}`;
    } else if (tags.length > 1) {
        resultString += " AND (tags:";
        resultString += tags.join(" OR tags:");
        resultString += ")";
    }

    return resultString;
}
