import { BidType } from "./bidder";
import { ItemType } from "./item";

export default interface ModalContentType {
    item: ItemType | null;
    bidders: BidType[];
}
