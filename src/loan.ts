var fs = require('fs');
const readline = require('readline');
const LOAN_FILE_PATH = 'src/loan-file.txt';
import { CustomerDetails, BalanceRequest, Action } from './loan.types';

import { prepareLoanDetails, preparePayments, prepareBalanceRequest } from './functions/helpers';
import { getLoanBalance } from './functions/businessLogic';

const convertTextToJSON = async (rl: Promise<string> ): Promise<{ customerDetails: CustomerDetails[]; balanceRequest: BalanceRequest[]; }> => {

    const customerDetails: CustomerDetails[] = [];
    const balanceRequest: BalanceRequest[] = [];

    for await (const line of await rl) {
        const transaction = line.split(" ");
        switch(transaction[0]) {
            case Action.Loan:
                customerDetails.push({
                    bankName: transaction[1],
                    borrowerName: transaction[2],
                    loanDetails: prepareLoanDetails(transaction),
                    payments: []
                } as CustomerDetails);
                break;
            case Action.Payment:
                const getCustomerIndex: number = customerDetails.findIndex((customer: CustomerDetails) => customer.bankName === transaction[1] && customer.borrowerName === transaction[2] )
                customerDetails[getCustomerIndex].payments.push(preparePayments(transaction))
                break;
            case Action.Balance:
                balanceRequest.push(prepareBalanceRequest(transaction))
                break
            default:
                console.error("Invalid input action")
        }
    }

    return { customerDetails, balanceRequest }

}

const getBalanceRequest = (customerDetails: CustomerDetails[], balanceRequest: BalanceRequest[]) => {
    balanceRequest.forEach((balance: BalanceRequest) => {
        const {  customerInfo, amountPaid, numberOfEmiRemaining } = getLoanBalance(customerDetails, balance)
        console.log(customerInfo.bankName, customerInfo.borrowerName, amountPaid, numberOfEmiRemaining)
    });
}

export const readFileAndOutput = async (): Promise<void> => {
    const fileStream = fs.createReadStream(LOAN_FILE_PATH);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

    const {customerDetails, balanceRequest} = await convertTextToJSON(rl);

    getBalanceRequest(customerDetails, balanceRequest)
}
