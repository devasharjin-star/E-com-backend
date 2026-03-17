import express from 'express';
import 'dotenv/config'
import connectToDb from './DB/dbconfig.js';
import dns from 'dns';
import route from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const app=express()

connectToDb()

app.use(express.json())
app.use(cookieParser())

app.use('/api',route)
app.use('/api',userRouter)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})