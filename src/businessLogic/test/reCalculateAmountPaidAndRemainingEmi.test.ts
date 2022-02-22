import { reCalculateAmountPaidAndRemainingEmi } from "..";
import { mockCustomerDetails, mockAmountPaid, mockEmi, mockNumberOfEmiRemaining } from "./mocks";

describe("ReCalculateAmountPaidAndRemainingEmi()", () => {
    it("should return newAmountPaid and newNumberOfEmiRemaining", () => {
        expect(reCalculateAmountPaidAndRemainingEmi(mockCustomerDetails, mockAmountPaid, mockEmi, mockNumberOfEmiRemaining)).toEqual({
            newAmountPaid: 2326,
            newNumberOfEmiRemaining: 7,
        });
    })
});