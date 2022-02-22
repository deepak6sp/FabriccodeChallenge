import { basicCalculations } from "..";
import { mockCustomerDetails } from "./mocks";


describe("BasicCalculations()", () => {
    it("should return valid loan tenure and emi", () => {
        expect(basicCalculations(mockCustomerDetails)).toEqual({
            loanTenure: 12,
            emi: 442,
        });
    })
});
