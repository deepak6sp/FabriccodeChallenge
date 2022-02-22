import { reCalculateAmountPaidAndRemainingEmi } from "..";
import { mockCustomerDetails, mockAmountPaid, mockEmi, mockNumberOfEmiRemaining } from "./mocks";

describe("ReCalculateAmountPaidAndRemainingEmi()", () => {
    it("should return valid loan tenure and emi", () => {
        expect(reCalculateAmountPaidAndRemainingEmi(mockCustomerDetails, mockAmountPaid, mockEmi, mockNumberOfEmiRemaining)).toEqual({
            newAmountPaid: 2326,
            newNumberOfEmiRemaining: 7,
        });
    })
});