import { transferTypes } from "@/constants/transferTypes";
import { IWalletState, Transaction } from "..";

export default abstract class WalletCalculator {
    public static countBalance(transactions: Transaction[]): IWalletState {
        let income = 0;
        let spent = 0;

        transactions.forEach(transaction => {
            switch (transaction.type) {
                case transferTypes.income:
                    income += transaction.amount
                    break;

                case transferTypes.outcome:
                    spent += transaction.amount
                    break;

                default:
                    break;
            }
        })
        return {
            income: income,
            spent: spent
        }

    }
}