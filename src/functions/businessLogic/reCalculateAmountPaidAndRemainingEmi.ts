import {CustomerDetails} from '../../loan.types';

export const reCalculateAmountPaidAndRemainingEmi = (customerInfo: CustomerDetails, amountPaid: number,  emi: number, numberOfEmiRemaining: number) => {
    const newAmountPaid = amountPaid + customerInfo.payments[0].amount
    const advanceEmi =  customerInfo.payments[0].amount / emi
    const newNumberOfEmiRemaining = Math.ceil(numberOfEmiRemaining - advanceEmi)

    return  { newAmountPaid, newNumberOfEmiRemaining }
}