var fs = require('fs');
const readline = require('readline');
const LOAN_FILE_PATH = 'src/loan-file.txt';
import { CustomerDetails, Payment, LoanDetails, BalanceRequest, Action, Transaction } from './loan.types';


const prepareLoanDetails = (transaction: any): LoanDetails => {
    return  {
        action: transaction[0],
        principal: Number(transaction[3]),
        noOfYears: Number(transaction[4]),
        rate: Number(transaction[5])
    }
}

const preparePayments = (transaction: any): Payment => {
    return {
        action: transaction[0],
        bankName: transaction[1],
        borrowerName: transaction[2],
        amount: Number(transaction[3]),
        emiNumber: Number(transaction[4])
    }
} 

const prepareBalanceRequest = (transaction: any): BalanceRequest => {
    return {
        action: transaction[0],
        bankName: transaction[1],
        borrowerName: transaction[2],
        emiNumber: Number(transaction[3])
    };
}

const convertTextToJSON = async (rl: Promise<string> ): Promise<{ customerDetails: CustomerDetails[]; balanceRequest: BalanceRequest[]; }> => {

    const customerDetails: CustomerDetails[] = [];
    const balanceRequest: BalanceRequest[] = [];

    for await (const line of await rl) {
        const transaction = line.split(" ").map(i => i);
        if (transaction[0] === Action.Loan) {
            customerDetails.push({
                bankName: transaction[1],
                borrowerName: transaction[2],
                loanDetails: prepareLoanDetails(transaction),
                payments: []
            } as CustomerDetails);
        }

        if (transaction[0] === Action.Payment) {
            const getCustomerIndex: number = customerDetails.findIndex((customer: CustomerDetails) => customer.bankName === transaction[1] && customer.borrowerName === transaction[2] )
            customerDetails[getCustomerIndex].payments.push(preparePayments(transaction))
        }

        if (transaction[0] === Action.Balance) {
            balanceRequest.push(prepareBalanceRequest(transaction))
        }
    }

    return { customerDetails, balanceRequest }

}

const basicCalculations = (customerInfo: CustomerDetails) => {
    const loanTenure = customerInfo.loanDetails.noOfYears * 12;
    const rateOnMonthlyBasis = (customerInfo.loanDetails.rate * 0.01) / 12;
    const total_interest = customerInfo.loanDetails.principal * loanTenure * rateOnMonthlyBasis;
    const total_repayment = customerInfo.loanDetails.principal + total_interest
    const emi = Math.ceil(total_repayment / loanTenure) // assuming a simple emi calculation here

    return { loanTenure, emi }
}

const reCalculateAmountPaidAndRemainingEmi = (amountPaid: number, customerInfo: CustomerDetails, emi: number, numberOfEmiRemaining: number) => {
    const newAmountPaid = amountPaid + customerInfo.payments[0].amount
    const advanceEmi =  customerInfo.payments[0].amount / emi
    const newNumberOfEmiRemaining = Math.ceil(numberOfEmiRemaining - advanceEmi)

    return  { newAmountPaid, newNumberOfEmiRemaining }
}

const loanBalance = (customers: CustomerDetails[], balanceRequest: BalanceRequest[]): void => {

    balanceRequest.forEach((balance: BalanceRequest) => {
        const customerInfo = customers.find((customer: any) => customer.bankName === balance.bankName && customer.borrowerName === balance.borrowerName)
        
        if(customerInfo) {
            const { loanTenure, emi } = basicCalculations(customerInfo)
            
            let numberOfEmiRemaining = Math.ceil(loanTenure - balance.emiNumber)
            let amountPaid = emi * balance.emiNumber

            if(customerInfo.payments.length > 0) {
                const { newAmountPaid, newNumberOfEmiRemaining  } = reCalculateAmountPaidAndRemainingEmi(amountPaid, customerInfo, emi, numberOfEmiRemaining)
                amountPaid = newAmountPaid
                numberOfEmiRemaining = newNumberOfEmiRemaining
            }
            
            console.log(customerInfo.bankName, customerInfo.borrowerName, amountPaid, numberOfEmiRemaining)
        } else {
            console.error("Error fetching account balance: Customer not found");
        }
    });
}

export const readFileAndOutput = async (): Promise<void> => {
    const fileStream = fs.createReadStream(LOAN_FILE_PATH);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

    const {customerDetails, balanceRequest} = await convertTextToJSON(rl);

    loanBalance(customerDetails, balanceRequest)
      
}
