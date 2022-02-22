import { Action, BalanceRequest, CustomerDetails } from "../../loan.types";

export const mockCustomerDetails: CustomerDetails = {
    "bankName": "IDIDI",
    "borrowerName": "Dale",
    "loanDetails": {
        "action": Action.Loan,
        "principal": 5000,
        "noOfYears": 1,
        "rate": 6
    },
    "payments": [
        {
            "action": Action.Payment,
            "bankName": "IDIDI",
            "borrowerName": "Dale",
            "amount": 1000,
            "emiNumber": 5
        }
    ]
};

export const mockCustomerDetailsWithoutPayments: CustomerDetails = {
    "bankName": "IDIDI",
    "borrowerName": "Dale",
    "loanDetails": {
        "action": Action.Loan,
        "principal": 5000,
        "noOfYears": 1,
        "rate": 6
    },
    "payments": []
};

export const mockAmountPaid = 1326;
export const mockEmi = 442;
export const mockNumberOfEmiRemaining = 9;

export const mockBalance: BalanceRequest =  {
    action: Action.Balance,
    bankName: 'IDIDI',
    borrowerName: 'Dale',
    emiNumber: 3
}

export const mockBalanceForNonExistingCustomer: BalanceRequest =  {
    action: Action.Balance,
    bankName: 'IDIDI',
    borrowerName: 'SomeRandomName',
    emiNumber: 3
}