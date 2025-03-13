const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.addButton');
const todoList = document.querySelector('.todoList');
const date = document.querySelector('.date');

document.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    const saveTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const renderTodoItem = (todo) => {
        const todoItem = document.createElement('li');
        todoItem.className = "todoItem";

        // todo 완료 여부
        const checkButton = document.createElement('input');
        checkButton.type = "checkbox";
        checkButton.checked = todo.completed;
        todoItem.className = todo.completed ? "completed" : "";
        checkButton.id = todo.id;
        checkButton.className = "todoCheckbox";
        checkButton.addEventListener("click", () => {
            todo.completed = !todo.completed;
            todoItem.className = todo.completed ? "completed" : "";
            saveTodos();
        })

        // todo text
        const content = document.createElement('label');
        content.innerText = todo.text;
        content.htmlFor = todo.id;

        // todo 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.className= 'deleteButton';
        deleteButton.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id);
            saveTodos();
            renderTodo();
        })

        todoItem.append(checkButton, content, deleteButton);
        todoList.appendChild(todoItem);
    }

    const renderTodo = () => {
        todoList.innerHTML = '';
        todos.forEach((todo) => renderTodoItem(todo));
    }

    // todo 추가 함수
    const addTodoItem = (todoText) => {
        const newTodo = { 
            id: `${Date.now()}`,
            text: todoText,
            completed: false,
        };

        todos.push(newTodo);
        saveTodos();
        renderTodoItem(newTodo);
    }

    // todo 추가 버튼 클릭 시
    todoButton.addEventListener("click", (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if(!todoText) {
            // alert 모달
        } else {
            addTodoItem(todoText);
            todoInput.value = "";
        }
    });

    renderTodo();
});