const express = require('express')
const cors = require('cors')
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config

const connectDB = require('./config/db')
const router = require("./routes")
const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL ||"http://localhost:3000",
    credentials:true    
    }
))
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit:'50mb',extend:true}))
app.use(express.json())
app.use(cookieParse())
app.use("/api",router)

const PORT = 8000 || process.env.PORT
connectDB().then(() => {
    app.listen(PORT,()=>{
        console.log("server is Running")
    })
})



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))