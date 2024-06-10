const { urlencoded } = require("body-parser");
const express =require("express");
const app= express();
const fs  =require("fs");
const path =require("path");//to use the path.join() method.
app.set('view engine','ejs')//setting up view engine as ejs
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));// all the statc files will in diranme public
//we ar just saying find static files in public directory
app.get("/",(req,res)=>{
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files: files});
    })
   
})
app.post("/create",(req,res)=>{
    const fileName = req.body.title.split(' ').join('') + '.txt';
    fs.writeFile(`./files/${fileName}`, req.body.details, function (err) {});
    res.redirect("/")//kam honeke baad slash pr redirect krdo
})
app.listen(3000,() => {
    console.log("Server is running on port 3000");
});