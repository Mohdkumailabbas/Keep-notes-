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
    if (req.body.title) {
        const fileName = req.body.title.split(' ').join('') + '.txt';
        fs.writeFile(`./files/${fileName}`, req.body.details, function (err) {});
    }
    res.redirect("/");
})
app.get("/file/:filename",(req,res)=>{
    const filepath= `./files/${req.params.filename}`;
    fs.readFile(filepath,"utf-8",(err,filedata)=>{
        console.log(filedata)
        res.render('show',{filename:req.params.filename, filedata:filedata});
    })
})


app.get("/edit/:filename",(req,res)=>{
    res.render('edit',{filename:req.params.filename})
})
app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
     
       res.redirect("/")
     })
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});