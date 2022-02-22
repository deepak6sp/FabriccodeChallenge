import { basicCalculations, reCalculateAmountPaidAndRemainingEmi } from ".";
import { CustomerDetails, BalanceRequest } from "../loan.types";


export const getLoanBalance = (customers: CustomerDetails[], balance: BalanceRequest): any => {
    const customerInfo = customers.find((customer: any) => customer.bankName === balance.bankName && customer.borrowerName === balance.borrowerName)
    
    if(!customerInfo) {
        console.error("Error fetching account balance: Customer not found");
        return;
    }
    
    const { loanTenure, emi } = basicCalculations(customerInfo)
    
    let numberOfEmiRemaining = Math.ceil(loanTenure - balance.emiNumber)
    let amountPaid = emi * balance.emiNumber

    if(customerInfo.payments.length > 0) {
        const { newAmountPaid, newNumberOfEmiRemaining  } = reCalculateAmountPaidAndRemainingEmi(customerInfo, amountPaid, emi, numberOfEmiRemaining)
        amountPaid = newAmountPaid
        numberOfEmiRemaining = newNumberOfEmiRemaining
    }

    return {
        customerInfo,
        amountPaid, 
        numberOfEmiRemaining
    }
}