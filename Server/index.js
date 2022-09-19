const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const docRoutes = require('./Routes/docRoutes')
require('dotenv').config();

app.use(express.json());
app.use(fileUpload())
app.use(cors())
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/doc",docRoutes)

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(process.env.MONGO_URI)
    console.log("DB connection successful")
    
}).catch((err)=> {
    console.log(err)
    
});

app.listen( process.env.PORT ||5000, () =>{
   console.log("Server is running")
})