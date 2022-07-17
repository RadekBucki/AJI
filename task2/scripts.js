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
                (startDate === "" || Date.parse(startDate) <= dueDate) &&
                (endDate === "" || Date.parse(endDate) >= dueDate)
            )
        ) {
            todoListDiv.append(
                "<tr>" +
                "<td>" + todoList[todo].title + "</td>" +
                "<td>" + todoList[todo].description + "</td>" +
                "<td>" + todoList[todo].place + "</td>" +
                "<td>" + dueDate.toLocaleString() + "</td>" +
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
    if ($("footer").hasClass("fixed-bottom")) {
        bodyHeight += $("footer").height();
    }
    if (bodyHeight < $(window).height()) {
        $("footer").addClass("fixed-bottom");
        console.log("window");
    } else {
        $("footer").removeClass("fixed-bottom");
        console.log("body");
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
        url: 'https://api.jsonbin.io/v3/b/62cc706df023111c7073297e',
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