var express=require('express')
var bodyParser=require('body-parser')
var mongoose =require('mongoose')
var app=express()
var cors=require('cors')
var user=require('./routes/user')
var product=require('./routes/product')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use('/user',user)
app.use('/product',product)
const PORT=process.env.PORT||5000;
const uri = process.env.URI;
mongoose.connect(uri, {
     useNewUrlParser: true,
     useFindAndModify:false,
    useUnifiedTopology: true  }).then(()=>{
        console.log("database connected..")
    }).catch(err=>console.log(err))

app.use((req,res)=>{
    res.send("page not found");
})
app.listen(PORT,(err)=>{
    if(err)console.log(err)
    else{
        console.log("listening to port "+PORT);
    }
})

