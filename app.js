const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth',authRoutes);
app.use((error,req,res,next)=>{
  console.log(error);
  const status=error.statusCode||500;
  const message=error.message;
  res.status(status).json({message:message});
})

mongoose.connect('mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xxkrm.mongodb.net/{process.env.MONGO_DB}?retryWrites=true&w=majority').then(connected=>{
  app.listen(3000,()=>{
    console.log('started');
  })
}).catch(err=>{
  console.log(err);
})
