const express = require('express')
const app = express()
const port = 3000
import { readFileAndOutput } from "./src";

const filePath = process.argv[2];

readFileAndOutput(filePath)

app.listen(port);