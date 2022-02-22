import { getLoanBalance } from '../getLoanBalance';
import { 
    mockCustomerDetails, 
    mockBalance,
    mockCustomerDetailsWithoutPayments,
    mockBalanceForNonExistingCustomer 
} from "./mocks";


describe("GetLoanBalance()", () => {
    it("should return mockCustomerDetails, amountPaid, numberOfEmiRemaining with payments", () => {
        expect(getLoanBalance([mockCustomerDetails], mockBalance)).toEqual({
            customerInfo: expectedCustomerInfoWithPayments,
            amountPaid: 2326, 
            numberOfEmiRemaining: 7
        });
    })

    it("should return mockCustomerDetails, amountPaid, numberOfEmiRemaining without payments", () => {
        expect(getLoanBalance([mockCustomerDetailsWithoutPayments], mockBalance)).toEqual({
            customerInfo: expectedCustomerInfoWithOutPayments,
            amountPaid: 1326, 
            numberOfEmiRemaining: 9
        });
    })

    it("should return console log with error if no customer with loan found", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        getLoanBalance([mockCustomerDetailsWithoutPayments], mockBalanceForNonExistingCustomer)
        expect(consoleSpy).toHaveBeenCalledWith("Error fetching account balance: Customer not found")
    })
});

const expectedCustomerInfoWithPayments = {
    bankName: 'IDIDI',
    borrowerName: 'Dale',
    loanDetails: { 
        action: 'LOAN', 
        principal: 5000, 
        noOfYears: 1, 
        rate: 6 
    },
    payments: [
        {
            action: "PAYMENT",
            bankName: "IDIDI",
            borrowerName: "Dale", 
            amount:1000,
            emiNumber:5
        }
    ]
}

const expectedCustomerInfoWithOutPayments = {
    bankName: 'IDIDI',
    borrowerName: 'Dale',
    loanDetails: { 
        action: 'LOAN', 
        principal: 5000, 
        noOfYears: 1, 
        rate: 6 
    },
    payments: []
}

