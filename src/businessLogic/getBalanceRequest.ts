import { getLoanBalance } from ".";
import { BalanceRequest, CustomerDetails } from "../loan.types";

export const getBalanceRequest = (customerDetails: CustomerDetails[], balanceRequest: BalanceRequest[]) => {
    balanceRequest.forEach((balance: BalanceRequest) => {
        const {  customerInfo, amountPaid, numberOfEmiRemaining } = getLoanBalance(customerDetails, balance)
        console.log(customerInfo.bankName, customerInfo.borrowerName, amountPaid, numberOfEmiRemaining)
    });
}