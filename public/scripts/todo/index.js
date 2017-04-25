//function for refreshing / updating windows
function refresh(){
   window.location.replace("./");
}

$(document).ready(function(){
  $.getJSON("/todo/api/list", function(data){
    var todoList = $("#todoList");
    data.forEach(function(todoItem){
         var li = $('<li>')
         .text(todoItem)
         .addClass('todo-item')
         .appendTo(todoList);
     });
});


$("#addTodoButton").click(function(){
  // if($("#newTodoInput").val().todo.length <= 3)
      $.post("./api/create",{todo : $("#newTodoInput").val()});
   //refresh window
   refresh();
});

$("#delButton").click(function(){
    $.post("./api/delete",{index: $("#deleteIndex").val()})
    alert('delete post done!');
    refresh();
});

$("#editButton").click(function(){
    $.post("./api/edit",{edit_index: $("#editIndex").val(), edit:$("#editInput").val()});
    //refreshing page
    refresh();
});

});//end
