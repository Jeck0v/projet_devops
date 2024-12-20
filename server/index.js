const express = require("express");
const cors = require("cors");


const app = express()

app.use(express.json())
app.use(cors())

app.get("/AddItem", (req, res) => {
    console.log(req.body)
    res.send("response received: " + req.body)
})


app.listen(4000, () => console.log("server on localhost:4000"));