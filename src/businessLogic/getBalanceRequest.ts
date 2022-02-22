import { getLoanBalance } from ".";
import { BalanceRequest, CustomerDetails } from "../loan.types";

export const getBalanceRequest = (customerDetails: CustomerDetails[], balanceRequest: BalanceRequest[]) => {
    const balanceResponse = balanceRequest.map((balance: BalanceRequest) => {
        const {  customerInfo, amountPaid, numberOfEmiRemaining } = getLoanBalance(customerDetails, balance)
        return {
            bankName: customerInfo.bankName,
            borrowerName: customerInfo.borrowerName,
            amountPaid,
            numberOfEmiRemaining
        }
    });
    return balanceResponse;
}