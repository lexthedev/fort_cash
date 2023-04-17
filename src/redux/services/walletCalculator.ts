import { transferTypes } from "@/constants/transferTypes";
import { IWalletState, Transaction, Transactions } from "..";

export default abstract class WalletCalculator {
    public static countBalance(transactions: Transactions): IWalletState {
        let income = 0;
        let spent = 0;

        Object.keys(transactions).forEach(tkey => {
            const transaction = transactions[tkey]
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