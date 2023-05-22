import express from "express";
import  {puerto}  from "./config";
const cors = require('cors')


import loginRoutes from './routes/loginRoutes'


const app = express()

//Settings
app.set('port', puerto.port || 366)



//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors({origin: "http://localhost:4200"}))

//routes
app.use(loginRoutes)


export default app