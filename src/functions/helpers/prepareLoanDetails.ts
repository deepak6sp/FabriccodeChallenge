import { LoanDetails, Action } from '../../loan.types';

export const prepareLoanDetails = (transaction: string[]): LoanDetails => {
    return  {
        action: Action.Loan,
        principal: Number(transaction[3]),
        noOfYears: Number(transaction[4]),
        rate: Number(transaction[5])
    }
}
