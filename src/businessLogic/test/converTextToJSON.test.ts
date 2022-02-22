const fs = require('fs');
const readline = require('readline');
const LOAN_FILE_PATH = 'src/businessLogic/test/mock-loan-file.txt';
import { convertTextToJSON } from '../converTextToJSON'
import { mockCustomerDetails, mockBalance } from './mocks';


describe("ConvertTextToJSON()", () => {
    it("should return valid loan tenure and emi", async () => {
        const fileStream = fs.createReadStream(LOAN_FILE_PATH);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        expect(await convertTextToJSON(rl)).toEqual({
            customerDetails: [mockCustomerDetails],
            balanceRequest: [mockBalance]
        });
    })
});