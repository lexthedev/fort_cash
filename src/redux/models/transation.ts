import { transferTypes } from "@/constants/transferTypes";

export interface Transaction {
    amount: number;
    category: string;
    type: transferTypes;
}