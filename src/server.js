// if(process.env.NODE_ENV !== "production"){
//     require("dotenv");
// }

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
require("dotenv").config({})

//setup the view engine
app.set("view engine", "ejs");

// where our views should be coming from
app.set("views",`${__dirname}/views`);

//hookup the express layouts || every single file would be put here
app.set("layout","layouts/layout");
app.use(expressLayouts);

//where express should get our public files
app.use(express.static("public"));

//Connect to Database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
})

//set up connection
const db = mongoose.connection
    db.on("error",error => console.error("error"))
    db.once("open",() => console.log("Connected to Database"))



// Routes
app.use('/',indexRouter)



// listen to the server
app.listen(process.env.PORT || 3000);



