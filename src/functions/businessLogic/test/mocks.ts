import { Action, CustomerDetails } from "../../../loan.types";

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

export const mockAmountPaid = 1326;
export const mockEmi = 442;
export const mockNumberOfEmiRemaining = 9;