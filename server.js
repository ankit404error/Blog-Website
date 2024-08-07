const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const path = require('path');
const app = express()

const port = 5000;


//Middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');


//Connecting MonogoDB
mongoose.connect('mongodb://127.0.0.1:27017/BlogDB',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is Connected!'))
  .catch(err => console.log(err));


//Routes
app.use('/posts', require("./routes/posts"));

app.get("/",(req,res)=>{
    res.redirect('/posts');
});

app.listen(port,()=>{
    console.log(`The port is listening to http://localhost:${port}`);
})