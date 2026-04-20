import express from 'express';
import 'dotenv/config'
import connectToDb from './DB/dbconfig.js';
import dns from 'dns';
import productRoute from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import connectCloudinary from './helper/cloudinaryconfig.js';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const app=express()

connectToDb()
connectCloudinary()

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

app.use('/api',productRoute)
app.use('/api',userRouter)
app.use('/api',orderRouter)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})