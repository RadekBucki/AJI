"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = () => {
    $.ajax({
        url: 'https://api.jsonbin.io/v3/b/62cc706df023111c7073297e/latest',
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': '$2b$10$FddDHZtdilm.WmOZjIAGGOR.1kiXHobHN/zHw0KR/QOQjEmbWGcuC'
        },
        success: (data) => {
            todoList = data.record;
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

initList();

let updateTodoList = () => {
    let todoListDiv = $("#todoListView");
    //remove all elements
    todoListDiv.empty();

    //add all elements
    let filterInput = $("#inputSearch").val();
    for (let todo in todoList) {
        if (
            (filterInput === "") ||
            (todoList[todo].title.includes(filterInput)) ||
            (todoList[todo].description.includes(filterInput))
        ) {
            todoListDiv.append(
                "<tr>" +
                "<td>" + todoList[todo].title + "</td>" +
                "<td>" + todoList[todo].description + "</td>" +
                "<td>" + todoList[todo].place + "</td>" +
                "<td>" + (new Date(todoList[todo].dueDate)).toLocaleString() + "</td>" +
                "<td>" +
                "<button class='btn btn-danger float-end' onclick='deleteTodo(" + todo + ")'>" +
                "<i class='bi bi-trash''></i>"+
                "</button>" +
                "</td>" +
                "</tr>"
            );
            console.log(todoListDiv);
        }
    }
}

let addTodo = () => {
    let newTodo = {};
    $("#newRecord>input").each(function() {newTodo[this.name] = $(this).val()});
    todoList.push(newTodo);
    updateJSONbin();
}

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
}

let updateJSONbin = () => {
    $.ajax({
        url: 'https://api.jsonbin.io/v3/b/62cc706df023111c7073297e/latest',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': '$2b$10$FddDHZtdilm.WmOZjIAGGOR.1kiXHobHN/zHw0KR/QOQjEmbWGcuC'
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

setInterval(updateTodoList, 1000);