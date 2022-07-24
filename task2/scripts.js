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
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    for (let todo in todoList) {
        let dueDate = Date.parse(todoList[todo].dueDate);
        if (
            (
                filterInput === "" ||
                todoList[todo].title.includes(filterInput) ||
                todoList[todo].description.includes(filterInput) ||
                todoList[todo].place.includes(filterInput)
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
            todoListDiv.append(
                "<tr>" +
                "<td>" + todoList[todo].title + "</td>" +
                "<td>" + todoList[todo].description + "</td>" +
                "<td>" + todoList[todo].place + "</td>" +
                "<td>" + (
                    new Date(dueDate)
                ).toLocaleString() + "</td>" +
                "<td>" +
                "<button class='btn btn-danger float-end' onclick='deleteTodo(" + todo + ")'>" +
                "<i class='bi bi-trash''></i>" +
                "</button>" +
                "</td>" +
                "</tr>"
            );
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
}

setInterval(updateTodoList, 1000);