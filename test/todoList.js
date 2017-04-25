"use strict";
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = require('chai').expect;
chai.use(chaiHttp);


describe("Todo List", function(){
    this.timeout(0);
    describe("Initial test",function(){
        it("returns empty array",function(done){
        chai.request(app).get("/todo/api/list")
        .end(function(err,res){
        expect(res.statusCode).to.equal(200);
           res.body.should.be.a('array');
           expect(res.body.length).equals(0);
           setTimeout(done, 400)
           
        });
        
        });        
    
});

    describe("Add operation",function(done){
        it("Adds element",function(done){
            chai.request(app).post("/todo/api/create")
            .send({todo:"Code"}).end(function(err,res,req){
            expect(res.statusCode).to.equal(200);
            });
            chai.request(app).get("/todo/api/list")
            .end(function(err,res){
            expect(res.statusCode).to.equal(200);            
                var test = "Code";
                test.should.equal(res.body[0]);
            });
            setTimeout(done, 400);            
        });
        it("Changes size",function(done){
            chai.request(app).post("/todo/api/create").send({todo:"test todo 1"}).end();
            chai.request(app).post("/todo/api/create").send({todo:"test todo 2"}).end();

            chai.request(app).get("/todo/api/list")
            .end(function(err,res){
            expect(res.statusCode).to.equal(200);
            expect(res.body.length).equals(3); //check length after adding one todo
                 
             });
        setTimeout(done, 500);
        });
        });

        
    });


//


describe("Edit operation",function(){
        it("Edits correctly",function(done){
            
        //editting the todolist
         chai.request(app).post("/todo/api/edit")
            .send({edit:"todo_2", edit_index:1}).end(function(){});            
         chai.request(app).post("/todo/api/edit")
        .send({edit:"todo_1", edit_index:2}).end(function(){});            
         

            chai.request(app).get('/todo/api/list')
            .end(function(req,res,body){
                var list = res.body;
                list[2].should.equal("todo_1");
                list[1].should.equal("todo_2"); 
            });

            setTimeout(done, 300);
        });
    
});
    
    
//

    describe("Delete operation",function(){
        
        it("removes element, without throw",function(done){
            chai.request(app).post("/todo/api/delete")
            .send({index:0})
            .end(function(req,res,body){
                expect(res.body).is.a('array');
            });
            setTimeout(done, 500);
        });

        it("Returns correct size after removing",function(done){
            chai.request(app).get('/todo/api/list')
            .end(function(req,res,body){
                var list = res.body;
                list.length.should.equal(2);
            });
            setTimeout(done, 500);
        });


        it("REmoves correct elements",function(done){
             chai.request(app).get('/todo/api/list')
            .end(function(req,res,body){
                var list = res.body;
                list.should.not.have.a("Code");
            });
            setTimeout(done, 500);
        });
            
        it("Can remove everything",function(done){
            chai.request(app).post("/todo/api/delete")
            .send({index:0}).end(function(){});
            
            chai.request(app).post("/todo/api/delete")
            .send({index:0}).end(function(){});
            
            chai.request(app).post("/todo/api/delete")
            .send({index:0}).end(function(){});
            

            chai.request(app).get('/todo/api/list')
            .end(function(req,res,body){
                var list = res.body;
                list.length.should.equal(1);
            });
            setTimeout(done, 500);
            
        });

});
    


