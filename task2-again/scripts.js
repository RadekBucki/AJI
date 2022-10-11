"use strict"
let todoList = []; //declares a new array for Your todo list
const binUrl = 'https://api.jsonbin.io/v3/b/63453bcb65b57a31e6928517'
const secretKey = '$2b$10$upY66Zcvj.lnzQvSKsKSk.RoirZMUwWabcgqSzL34M0n4vBOcuxz.'

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

$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: `${binUrl}/latest`,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'X-Master-Key': secretKey
    },
    success: (data) => {
        todoList = data.record;
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});

let updateJSONbin = function () {
    $.ajax({
        url: binUrl,
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': secretKey
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    })
};

let updateTodoList = function () {
    let todoListDiv =
        document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");
    let table = document.createElement("table");
    todoListDiv.appendChild(table);
    let titleTableRow = document.createElement("tr");
    let titleHeader = document.createElement("th");
    let titleTitle = document.createTextNode("Title");
    titleHeader.appendChild(titleTitle);
    let descriptionHeader = document.createElement("th");
    let descriptionTitle = document.createTextNode("Description");
    descriptionHeader.appendChild(descriptionTitle);
    let placeHeader = document.createElement("th");
    let placeTitle = document.createTextNode("Place");
    placeHeader.appendChild(placeTitle);
    let dateHeader = document.createElement("th");
    let dateTitle = document.createTextNode("DueDate");
    dateHeader.appendChild(dateTitle);
    titleTableRow.appendChild(titleHeader);
    titleTableRow.appendChild(descriptionHeader);
    titleTableRow.appendChild(placeHeader);
    titleTableRow.appendChild(dateHeader);
    table.appendChild(titleTableRow);
    for (let todo in todoList) {
        if ((filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))
        ) {
            let newTableRow = document.createElement("tr");
            let title = document.createElement("td")
            let titleContent = document.createTextNode(todoList[todo].title);
            title.appendChild(titleContent);
            let description = document.createElement("td")
            let descriptionContent = document.createTextNode(todoList[todo].description);
            description.appendChild(descriptionContent);
            let place = document.createElement("td")
            let placeContent = document.createTextNode(todoList[todo].place);
            place.appendChild(placeContent);
            let date = document.createElement("td")
            let dateContent = document.createTextNode(todoList[todo].dueDate);
            date.appendChild(dateContent);

            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todo);
                });
            newTableRow.appendChild(title);
            newTableRow.appendChild(description);
            newTableRow.appendChild(place);
            newTableRow.appendChild(date);
            newTableRow.appendChild(newDeleteButton);
            table.appendChild(newTableRow);
        }
    }
}

setInterval(updateTodoList, 1000);

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