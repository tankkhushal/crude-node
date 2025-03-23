const express = require("express")
const port = 8001;
const app = express();
const path = require('path')

const db = require("./config/db")
const model = require("./model/mongodb");
const student = require("./model/mongodb");


app.set("view engine","ejs")
app.set("views", path.join(__dirname , "views"))

app.use (express.urlencoded()) 

app.get("/",async (req,res)=>{
try{ 
    const studata = await student.find();
    return res.render("home",{
        studata
    })
}
catch(err){
    console.log(err)
    return res.redirect("back")

}
})

app.post("/adddata",async (req,res)=>{
    try{ 
        const addstu = await student.create(req.body)
        if(addstu){
            console.log("data add succefully")
            return res.redirect("back")
        }
        else{
            console.log("data not add ")
            return res.redirect("back")
        }    
    }
    catch(err){
        console.log(err)
        return res.redirect("back")
    
    }
    })
app.get("/delete",async (req,res)=>{
    try{ 
        const delstudent = await student.findByIdAndDelete(req.query.id)
        if(delstudent){
            console.log("data delete succefully")
            return res.redirect("back")
        }
        else{
            console.log("data not delete ")
            return res.redirect("back")
        }    
    }
    catch(err){
        console.log(err)
        return res.redirect("back")
        }
    })
app.get("/update/:id",async (req,res)=>{
    try{ 
        const updatestu = await student.findById(req.params.id)
        if(updatestu){
            
            return res.render("edit",{
                updatestu
            })
        }
        else{
            console.log("data not delete ")
            return res.redirect("back")
        }    
    }
    catch(err){
        console.log(err)
        return res.redirect("back")
        }
    })
    app.post("/edit",async (req,res)=>{
        try{ 
            const aditstudent = await student.findByIdAndUpdate(req.body.id,req.body)
            if(aditstudent){
                console.log("data updet succefully")
                return res.redirect("/")
            }
            else{
                console.log("data not updet ")
                return res.redirect("back")
            }
        

        
        }
        catch(err){
            console.log(err)
            return res.redirect("back")
        
        }
        })


app.listen(port,(err)=>{
  if(err){
    console.log(err)
    return false
  }
  console.log("server is start"+port)
})