import { transferTypes } from "@/constants/transferTypes";
import { Transaction } from "@/redux";

export interface ITransferInput {
    type: transferTypes,
    transaction?: Transaction,
    onClose?: () => void,
}