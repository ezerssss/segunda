import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import BuyerViewBiddersModal from "./buyer-view-bidders-modal";
import SellerViewBiddersModal from "./seller-view-bidders-modal";

registerSheet("buyer-modal", BuyerViewBiddersModal);
registerSheet("seller-modal", SellerViewBiddersModal);

declare module "react-native-actions-sheet" {
    interface Sheets {
        "buyer-modal": SheetDefinition;
        "seller-modal": SheetDefinition;
    }
}

export {};
