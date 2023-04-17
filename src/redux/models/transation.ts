import { transferTypes } from "@/constants/transferTypes";

export interface Transaction {
    id?: string
    amount: number;
    categoryId: string;
    type: transferTypes;
}

export interface Transactions {
    [id: string]: Transaction
}