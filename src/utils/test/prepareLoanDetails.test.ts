import { prepareLoanDetails } from '../prepareLoanDetails';

describe("prepareLoanDetails()", () => {
    it("should return valid json", () => {
        expect(prepareLoanDetails([ 'LOAN', 'IDIDI', 'Dale', '10000', '5', '4' ])).toEqual({
            action: 'LOAN',
            principal: 10000,
            noOfYears: 5,
            rate: 4
        });
    })
});