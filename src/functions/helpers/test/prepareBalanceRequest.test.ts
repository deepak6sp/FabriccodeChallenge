import { prepareBalanceRequest } from '../prepareBalanceRequest';

describe("PrepareBalanceRequest()", () => {
    it("should return valid json", () => {
        expect(prepareBalanceRequest([ 'BALANCE', 'MBI', 'HARRY', '12' ])).toEqual({
            action: 'BALANCE',
            bankName: 'MBI',
            borrowerName: 'HARRY',
            emiNumber: 12
        });
    })
});
