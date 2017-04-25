var express = require("express");
var todoRouter = express.Router();
var todoList = require("./todoList.js");
var path = require('path');

todoRouter.get('/',function(req,res){
    console.log("todo page requested");
    res.sendFile(path.join(__dirname,'views','todo','/index.html'));
});

todoRouter.get('/create',function(req,res,next){
    console.log("create page requested");
    res.sendFile(path.join(__dirname,'views','todo','/create.html'));
    
});

todoRouter.get('/delete',function(req,res){
    res.sendFile(path.join(__dirname,'views','todo','/delete.html'));
});




todoRouter.get('/edit',function(req,res){
    res.sendFile(path.join(__dirname,'views','todo','/edit.html'));
});

// // RESTful interfaces
todoRouter.get('/api/list',function(req,res){
     res.send(todoList.get());
});

//creating a todo

todoRouter.post('/api/create', function(req,res){
      //console.log("TESTING");
      if(err){
          var err = "Angazi zikhiphani";
          throw err;
      }

    //  console.log("Creating the following todo: ",req.body.todo);
      todoList.add(req.body.todo);
      res.redirect('./list');
});

// viewing a specifing todo

 todoRouter.post('/api/get/:id', function(req,res){
     res.json([req.params.id]);
 });

//deleting
 todoRouter.post('/api/delete',function(req,res){
     var index = req.body.index*1/1 + 1;
     console.log(index);

     if(err){
         var err = "Failed to del.";
         throw err;
     }
     //else if (req.params.id>= todoList.length())
       // throw err;
     //cut from  start to index-1
    if(index >=0 && index < todoList.get().length){
        todoList.delete(index); 
        res.redirect('./list');
 }
   
    else
        throw "Index out of range";
 });


//editing 
 todoRouter.post('/api/edit',function(req,res){
        console.log('editing a todo entry');
        var index = ((req.body.edit_index.valueOf())*1)/1;
        console.log(index);
        if( index>= todoList.length || index < 0)
            throw "Index of of range!";
        todoList.edit(req.body.edit,req.body.edit_index);
        res.redirect('./list');
 });

module.exports = todoRouter;