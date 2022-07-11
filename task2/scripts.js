"use strict"
let todoList = []; //declares a new array for Your todo list

let initList = function () {
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else
        todoList.push(
            {
                title: "Learn JS",
                description: "Create a demo application for my TODO's",
                place: "445",
                dueDate: new Date(2019, 10, 16)
            },
            {
                title: "Lecture test",
                description: "Quick test from the first three lectures",
                place: "F6",
                dueDate: new Date(2019, 10, 17)
            }
            // of course the lecture test mentioned above will not take place
        );
}

// initList();
$.ajax({
    url: 'https://api.jsonbin.io/b/62cc706df023111c7073297e/latest',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': '$2b$10$FddDHZtdilm.WmOZjIAGGOR.1kiXHobHN/zHw0KR/QOQjEmbWGcuC'
    },
    success: (data) => {
        // console.log(data);
        todoList = data
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});

let updateTodoList = function () {
    let todoListDiv =
        document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");
    for (let todo in todoList) {
        if (
            (filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))
        ) {
            let row = document.createElement("tr");

            let title = document.createElement("td");
            title.appendChild(document.createTextNode(todoList[todo].title));
            row.appendChild(title);

            let description = document.createElement("td");
            description.appendChild(document.createTextNode(todoList[todo].description));
            row.appendChild(description);

            let place = document.createElement("td");
            place.appendChild(document.createTextNode(todoList[todo].place));
            row.appendChild(place);

            let dueDate = document.createElement("td");
            dueDate.appendChild(document.createTextNode(todoList[todo].dueDate));
            row.appendChild(dueDate);

            //delete button
            let action = document.createElement("td");
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                }
            );
            action.appendChild(newDeleteButton)
            row.appendChild(action);
            todoListDiv.appendChild(row);
        }
    }
}

let addTodo = function () {
    //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
    //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    //add item to the list
    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONbin();
}

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
}

setInterval(updateTodoList, 1000);

let updateJSONbin = function () {
    $.ajax({
        url: 'https://api.jsonbin.io/b/62cc706df023111c7073297e',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': '$2b$10$FddDHZtdilm.WmOZjIAGGOR.1kiXHobHN/zHw0KR/QOQjEmbWGcuC'
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