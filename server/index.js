require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/Public", express.static("Public"));
app.get('/', (req,res) => {
    res.status(201).send(`<h1>Welcome to Home Page API</h1>`)
})

// Import Router
const {userRouter} = require('./router')
app.use('/user', userRouter)



app.listen(PORT, () => console.log(`Conected to localhost ${PORT}`));
