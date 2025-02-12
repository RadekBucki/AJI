"use strict"
let todoList = []; //declares a new array for Your todo list
const binUrl = 'https://api.jsonbin.io/v3/b/62cc706df023111c7073297e';
const xMasterKey = '$2b$10$FddDHZtdilm.WmOZjIAGGOR.1kiXHobHN/zHw0KR/QOQjEmbWGcuC';

let initList = () => {
    $.ajax({
        url: binUrl + '/latest',
        type: 'GET',
        headers: {
            'X-Master-Key': xMasterKey
        },
        success: (data) => {
            todoList = data.record;
            updateTodoList();
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
    let filterInput = $("#inputSearch").val().toLowerCase();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    for (let todo in todoList) {
        let dueDate = Date.parse(todoList[todo].dueDate);
        if (
            (
                filterInput === "" ||
                todoList[todo].title.toLowerCase().includes(filterInput) ||
                todoList[todo].description.toLowerCase().includes(filterInput) ||
                todoList[todo].place.toLowerCase().includes(filterInput)
            ) &&
            (
                (
                    startDate === "" || Date.parse(startDate) <= dueDate
                ) &&
                (
                    endDate === "" || Date.parse(endDate) >= dueDate
                )
            )
        ) {
            let newTableRow = $('<tr>').appendTo(todoListDiv);
            $('<td>').appendTo(newTableRow).text(todoList[todo].title);
            $('<td>').appendTo(newTableRow).text(todoList[todo].description);
            $('<td>').appendTo(newTableRow).text(todoList[todo].place);
            $('<td>').appendTo(newTableRow).text((new Date(dueDate)).toLocaleString());
            let buttonPlaceInRow = $('<td>').appendTo(newTableRow);
            let button = $('<button>', {
                class: 'btn btn-danger float-end'
            }).on('click', function () {
                deleteTodo(todo)
            }).appendTo(buttonPlaceInRow)
            let icon = $('<i>', {
                class: 'bi bi-trash'
            }).appendTo(button)
        }
    }
    let bodyHeight = $("body").height();
    let footer = $("footer");
    if (footer.hasClass("fixed-bottom")) {
        bodyHeight += footer.height();
    }
    if (bodyHeight < $(window).height()) {
        footer.addClass("fixed-bottom");
    } else {
        footer.removeClass("fixed-bottom");
    }
}

let addTodo = () => {
    let newTodo = {};
    let isSomethingInvalid = false;
    $("#newRecord>input").each(function (i, value) {
        let name = value.name;
        value = $(value);
        let val = value.val();
        value.removeClass("is-valid");
        value.removeClass("is-invalid");
        if (val === "") {
            value.addClass("is-invalid");
            isSomethingInvalid = true;
        } else {
            value.addClass("is-valid");
        }
        newTodo[name] = val;
    });
    if (isSomethingInvalid) {
        return;
    }
    todoList.push(newTodo);
    updateJSONbin();
}

let deleteTodo = (index) => {
    todoList.splice(index, 1);
    updateJSONbin();
}

let updateJSONbin = () => {
    $.ajax({
        url: binUrl,
        type: 'PUT',
        headers: {
            'X-Master-Key': xMasterKey
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
    updateTodoList();
}

for (let element of $("#filters input")) {
    element.addEventListener("input", updateTodoList);
    element.addEventListener("change", updateTodoList);
}