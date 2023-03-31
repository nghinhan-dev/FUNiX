// localStorage Key
const USER_KEY = "USER_KEY";
const CURRENT_USER = "CURRENT_USER";
const TODO_KEY = "TODO_KEY";

const userList = JSON.parse(localStorage.getItem(USER_KEY)) || [];
const todoList = JSON.parse(localStorage.getItem(TODO_KEY)) || [];
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER)) || [];

function saveLocalStorage() {
  let saveData = JSON.stringify(userList);
  localStorage.setItem(USER_KEY, saveData);
}

function saveCurrentUser() {
  let saveData = JSON.stringify(currentUser);
  localStorage.setItem(CURRENT_USER, saveData);
}

function saveToDoList() {
  let saveData = JSON.stringify(todoList);
  localStorage.setItem(TODO_KEY, saveData);
}
