const mstuProduct=require('./model/mprod').stuDet;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http=require('http');
const app = express();


const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydem',{useNewUrlParser:true}, error => {
    if(error)
    {
        console.log("connection failed");
        console.log(JSON.stringify(error));
    }else{
        console.log("successfully connected");
    }
});



//support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

//........Save Data..........
app.post('/api/stu',function(req,res){
 
    console.log(req.body);

    mstuProduct.find({id: req.body.id},function(err,docs){
        if(err){
            res.status(500).json({"error":err});
            console.log(err)
        }
        else{
            if(docs && docs.length>0)
            {
                res.status(200).json("warning this id is already exist"+docs[0].id)
            }
        
        else {
            let newStudent=new mstuProduct(req.body);
            newStudent.save(function(err,docs){
                
                if(err){
                    res.status(500).json("connection error");
                }
                else{
                    console.log(docs);
                    res.status(200).json({data:docs});
                }
            });
        }}
    })
});

//........Read/Show Values.......
app.get('/api/stuarray',function(req,res){
    mstuProduct.find({},function(err,docs){
        if(err){
            res.status(500).json("connection error");
        }
        else{
            console.log(docs);
            res.status(200).json({data:docs});
        }
    });
});

//.........Remove/Delete Values........
app.get('/api/remove/:studId',function(req,res){
    mstuProduct.remove({_id:req.params.studId},function(err,docs){
        if(err){
            res.status(500).json("connection error");
        }
        else{
            console.log(docs);
            res.status(200).json({data:docs});
        }
    });
    res.status(200)
});

//.......Update/Edit Values....
app.post('/api/studUpdate',function(req,res){
    mstuProduct.update({"_id" : req.body._id},
        
        {$set:{"id":req.body.id,
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "dateOfBirth":req.body.dateOfBirth,
        "age":req.body.age,
        "generalAddr":req.body.generalAddr}},function(err,docs){
           
        if(err){
            res.status(500).json("connection error");
        }
        else{
            res.status(200).json({data:docs});
        }
    });
});
http.createServer(app).listen(4000,function(){
    console.log("server successfully started 4000 port");
});

module.exports = app;
