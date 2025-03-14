import { formatDate } from './utils/formatDate.js';

const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.addButton');
const todoList = document.querySelector('.todoList');
const date = document.querySelector('.date');
const previousDate = document.querySelector('.previousDate');
const nextDate = document.querySelector('.nextDate');
const countIncompleteTodo = document.querySelector('.countIncompleteTodo');

const today = formatDate();

document.addEventListener("DOMContentLoaded", () => {
    let selectedOffset = 0;
    let selectedDate = today;

    date.innerHTML = selectedDate;
    previousDate.addEventListener("click", () => {
        selectedOffset--;
        selectedDate = formatDate(selectedOffset);
        date.innerHTML = selectedDate;
        renderTodo();
    })

    nextDate.addEventListener("click", () => {
        selectedOffset++;
        selectedDate = formatDate(selectedOffset);
        date.innerHTML = selectedDate;
        renderTodo();
    })

    let todos = JSON.parse(localStorage.getItem("todos")) || {};

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
            countTodo();
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
            todos[selectedDate] = todos[selectedDate].filter(item => item.id !== todo.id);
            saveTodos();
            renderTodo();
        })

        todoItem.append(checkButton, content, deleteButton);
        todoList.appendChild(todoItem);
    }

    const renderTodo = () => {
        todoList.innerHTML = '';
        if (!todos[selectedDate]) {
            todos[selectedDate] = [];
        }
        todos[selectedDate].forEach((todo) => renderTodoItem(todo));
        countTodo();
    }

    // todo 추가 함수
    const addTodoItem = (todoText) => {
        const newTodo = { 
            id: `${Date.now()}`,
            text: todoText,
            completed: false,
        };

        if(!todos[selectedDate]) {
            todos[selectedDate] = [];
        }

        todos[selectedDate].push(newTodo);
        countTodo();
        saveTodos();
        renderTodoItem(newTodo);
    }

    // todo 추가 버튼 disable
    const disableAddButton = () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            todoButton.disabled = false;
        } else {
            todoButton.disabled = true;
        }
    }
    
    disableAddButton();

    todoInput.addEventListener("keyup", disableAddButton);

    // todo 추가 버튼 클릭 시
    todoButton.addEventListener("click", (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        addTodoItem(todoText);
        todoInput.value = "";
    });

    todoInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && e.isComposing === false) {
            e.preventDefault();
            todoButton.click();
        }
    });

    const countTodo = () => {
        const incompleteTodos = todos[selectedDate].filter(todo => !todo.completed);
        countIncompleteTodo.innerHTML = "할 일: " + incompleteTodos.length;
    }

    renderTodo();
});