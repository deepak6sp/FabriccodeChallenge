export enum Action {
    Loan = 'LOAN',
    Payment = 'PAYMENT',
    Balance = 'BALANCE'
}
export interface LoanDetails {
    action: Action.Loan;
    principal: number;
    noOfYears: number;
    rate: number;
}

export interface Payment {
    action: Action.Payment;
    bankName: string;
    borrowerName: string;
    amount: number;
    emiNumber: number;
}

export interface CustomerDetails {
    bankName: string;
    borrowerName: string;
    loanDetails: LoanDetails;
    payments: Payment[];
}

export interface BalanceRequest {
    action: Action.Balance;
    bankName: string;
    borrowerName: string;
    emiNumber: number;
}

export type Transaction = LoanDetails | Payment | BalanceRequest;