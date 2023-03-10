const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000

const app =express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/openai", require("./routes/routes"))

app.listen(port, ()=>{
    console.log("Server running on port " + port)
})

