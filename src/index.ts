const fs = require('fs');
const readline = require('readline');
const LOAN_FILE_PATH = 'src/loan-file.txt';

import { convertTextToJSON } from './businessLogic/converTextToJSON';
import { getBalanceRequest } from './businessLogic';

export const readFileAndOutput = async (): Promise<void> => {
    const fileStream = fs.createReadStream(LOAN_FILE_PATH);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

    const {customerDetails, balanceRequest} = await convertTextToJSON(rl);

    console.log("----------OUTPUT----------")
    getBalanceRequest(customerDetails, balanceRequest)
}
