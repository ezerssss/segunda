import { liteClient as algoliasearch } from "algoliasearch/lite";

export const searchClient = algoliasearch(
    process.env.EXPO_PUBLIC_ALGOLIA_APP_ID ?? "",
    process.env.EXPO_PUBLIC_ALGOLIA_SEARCH_KEY ?? "",
);
