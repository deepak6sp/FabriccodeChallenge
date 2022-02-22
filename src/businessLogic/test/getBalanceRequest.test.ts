import { getBalanceRequest } from "..";
import { mockCustomerDetails, mockBalance } from "./mocks";


describe("GetBalanceRequest()", () => {
    it("should return bankName, borrowerName, amountPaid, numberOfEmiRemaining", () => {
        const consoleSpy = jest.spyOn(console, 'log');
        getBalanceRequest([mockCustomerDetails], [mockBalance]);
        expect(consoleSpy).toHaveBeenCalledWith("IDIDI", "Dale", 2326, 7);
    })
});
