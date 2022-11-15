let todoForm;
todoForm = document.querySelector('.main__todo-form');
let todoInput;
todoInput = document.querySelector('.main__todo-input');
let todoItemsList;
todoItemsList = document.querySelector('.main__todo-items');

let todos = [];

function addToDo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }

}

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addToDo(todoInput.value);
});

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
        // finally add the <li> to the <ul>
        todoItemsList.append(li);
    });
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}


function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
 if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});