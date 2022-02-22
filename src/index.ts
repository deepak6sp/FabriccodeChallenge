const fs = require('fs');
const readline = require('readline');
const FILE_DIR_PATH = 'src/files';
const LOAN_FILE_PATH = `${FILE_DIR_PATH}/loan-file.txt`;

import { convertTextToJSON } from './businessLogic/converTextToJSON';
import { getBalanceRequest } from './businessLogic';

export const parseFileAndGetBalance = async (filePath?: string): Promise<any> => {
    const file_to_execute = filePath ? filePath : LOAN_FILE_PATH
    const fileStream = fs.createReadStream(file_to_execute);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

    const { customerDetails, balanceRequest } = await convertTextToJSON(rl);
    const balanceResponse = getBalanceRequest(customerDetails, balanceRequest)
    return balanceResponse;
}
