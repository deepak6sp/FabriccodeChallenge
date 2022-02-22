import { CustomerDetails, BalanceRequest, Action } from "../loan.types";
import { prepareLoanDetails, preparePayments, prepareBalanceRequest } from "../utils";

export const convertTextToJSON = async (rl: Promise<string> ): Promise<{ customerDetails: CustomerDetails[]; balanceRequest: BalanceRequest[]; }> => {

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
                console.log("Invalid input action")
        }
    }

    return { customerDetails, balanceRequest }
}