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
    let todoListDiv = $('#todoListView')[0];

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = $('#inputSearch')[0];
    let table = jQuery('<table>').appendTo('#todoListView');
    let titleTableRow = jQuery('<tr>').appendTo(table);
    jQuery('<th>').appendTo(titleTableRow).text('Title');
    jQuery('<th>').appendTo(titleTableRow).text('Description');
    jQuery('<th>').appendTo(titleTableRow).text('Place');
    jQuery('<th>').appendTo(titleTableRow).text('DueDate');

    let startDt = $('#startDate')[0].value;
    let endDt = $('#endDate')[0].value;
    for (let todo in todoList) {
        let date = todoList[todo].dueDate.substr(0, todoList[todo].dueDate.indexOf('T'));
        if (((filterInput.value == "") ||
                (todoList[todo].title.includes(filterInput.value)) ||
                (todoList[todo].description.includes(filterInput.value))) &&
            (startDt === "" || startDt < date) &&
            (endDt === "" || endDt > date)
        ) {
            let newTableRow = jQuery('<tr>').appendTo(table);
            jQuery('<td>').appendTo(newTableRow).text(todoList[todo].title);
            jQuery('<td>').appendTo(newTableRow).text(todoList[todo].description);
            jQuery('<td>').appendTo(newTableRow).text(todoList[todo].place);
            jQuery('<td>').appendTo(newTableRow).text(todoList[todo].dueDate);

            jQuery('<input>', {
                type: 'button',
                value: 'x'
            }).on('click', function () {
                deleteTodo(todo);
            }).appendTo(newTableRow)
        }
    }
}

setInterval(updateTodoList, 1000);

let addTodo = function () {
    //get the elements in the form
    let inputTitle = $('#inputTitle')[0];
    let inputDescription = $('#inputDescription')[0];
    let inputPlace = $('#inputPlace')[0];
    let inputDate = $('#inputDate')[0];
    //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = JSON.stringify(new Date(inputDate.value));
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