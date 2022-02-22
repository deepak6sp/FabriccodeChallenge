import {CustomerDetails} from '../loan.types';

export const basicCalculations = (customerInfo: CustomerDetails) => {
    const loanTenure = customerInfo.loanDetails.noOfYears * 12;
    const rateOnMonthlyBasis = (customerInfo.loanDetails.rate * 0.01) / 12;
    const total_interest = customerInfo.loanDetails.principal * loanTenure * rateOnMonthlyBasis;
    const total_repayment = customerInfo.loanDetails.principal + total_interest
    const emi = Math.ceil(total_repayment / loanTenure) // assuming a simple emi calculation here

    return { loanTenure, emi }
}