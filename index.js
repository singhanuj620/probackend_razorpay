const express = require('express')
const app = express()
const path = require('path');
const Razorpay = require('razorpay')
app.use(express.json())
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post("/order", async (req, res) => {
    const amount = req.body.amount

    var instance = new Razorpay({ key_id: 'rzp_test_AyIgUheuam6kQv', key_secret: 'ep9yZBZqxmsVbkZczRPy5HWq' })

    const myOrder = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt#1"
    })

    res.status(200).json({
        success: true,
        amount,
        order: myOrder
    })

})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})