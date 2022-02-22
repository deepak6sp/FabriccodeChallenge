const express = require('express')
const app = express()
const port = 3000
import { readFileAndOutput } from "./src";

readFileAndOutput()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})