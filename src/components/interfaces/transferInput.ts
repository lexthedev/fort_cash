import { transferTypes } from "@/constants/transferTypes";

export interface ITransferInput {
    type: transferTypes,
    onClose?: () => void,
}