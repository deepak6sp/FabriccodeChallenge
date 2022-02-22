const express = require('express')
const app = express()
const port = 3000
import { parseFileAndGetBalance } from "./src";

const filePath = process.argv[2];

const getBalance = parseFileAndGetBalance(filePath)

getBalance.then(balance => {
    balance.forEach((b:any) => {
        console.log(b.bankName, b.borrowerName, b.amountPaid, b.numberOfEmiRemaining)
    })
})

app.listen(port);