import { getBalanceRequest } from "..";
import { mockCustomerDetails, mockBalance } from "./mocks";


describe("GetBalanceRequest()", () => {
    it("should return bankName, borrowerName, amountPaid, numberOfEmiRemaining", () => {
        expect(getBalanceRequest([mockCustomerDetails], [mockBalance])).toEqual([
            { 
                "bankName": "IDIDI", 
                "borrowerName": "Dale", 
                "amountPaid": 2326,
                "numberOfEmiRemaining": 7
            }
        ]);
    })
});
