const express = require('express')
const app = express()
const port = 3000
const bhimupijs = require("bhimupijs")
const axios = require('axios')
require('dotenv').config();


app.get('/upi-details', async (req, res) => {
  const vpa = req.query.vpa;
  try {
    const keyId = process.env.KEYID;

    const response1 = await bhimupijs.verifyUPI(vpa);
    const response3 = bhimupijs.validatePattern(vpa);

    const response2 = await axios.post(`https://api.razorpay.com/v1/payments/validate/account?key_id=${keyId}`, {

      entity: "vpa", value: vpa

    })

    res.send({ response1, response3, response2: response2.data })

  } catch (error) {
    console.error('Error:', error.message);
    res.send(error);
  }
})

app.listen(port, () => {
  console.log(`UPI/VPA Details Fetcher app listening on port ${port}`)
})
