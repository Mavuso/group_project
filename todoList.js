"use strict";
var list = [];

module.exports = {
    add : function(todo){
        list.push(todo)
    },
    edit: function(todo,index){
        list[index] = todo;
    },
    get: function(){
        return list;
    },
    delete: function(index){
        if(index == 0)
            list = [];
        else
            list.splice(index,1);
    },
    //get size
    listSize: function(){
        return list.length;
    },
    //get last element was added
    lastAdded:function(lastTodo){
        var temp = list;
        return temp.pop();
    }
}
