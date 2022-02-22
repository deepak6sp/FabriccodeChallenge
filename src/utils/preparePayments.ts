import { Payment, Action } from '../loan.types';

export const preparePayments = (transaction: string[]): Payment => {
    return {
        action: Action.Payment,
        bankName: transaction[1],
        borrowerName: transaction[2],
        amount: Number(transaction[3]),
        emiNumber: Number(transaction[4])
    }
} 