import { BalanceRequest, Action } from '../../loan.types';

export const prepareBalanceRequest = (transaction: string[]): BalanceRequest => {
    return {
        action: Action.Balance,
        bankName: transaction[1],
        borrowerName: transaction[2],
        emiNumber: Number(transaction[3])
    };
}
