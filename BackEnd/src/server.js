import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRouter from "./route/web"
import connectDB from "./config/connectDB"
import cors from 'cors'

require('dotenv').config()
// console.log(process.env)
let app = express()

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
});

app.use(cors({ credentials: true, origin: true }))

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


viewEngine(app)
initWebRouter(app)

connectDB();

let port = process.env.PORT || 8080

app.listen(port, () => {
    console.log("Backend nodejs is running", port)
})