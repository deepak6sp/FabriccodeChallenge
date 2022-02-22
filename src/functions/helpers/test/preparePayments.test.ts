import { preparePayments } from '../preparePayments';

describe("preparePayments()", () => {
    it("should return valid json", () => {
        expect(preparePayments([ 'PAYMENT', 'IDIDI', 'Dale', '1000', '5' ])).toEqual({
            action: 'PAYMENT',
            bankName: 'IDIDI',
            borrowerName: 'Dale',
            amount: 1000,
            emiNumber: 5
        });
    })
});