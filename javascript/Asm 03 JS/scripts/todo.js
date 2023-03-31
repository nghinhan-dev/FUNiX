let taskList =
  currentUser[0]?.taskList == undefined ? [] : currentUser[0].taskList;

let getNewTask = () => {
  let id =
    currentUser[0].taskList == undefined ? 0 : currentUser[0].taskList.length;
  let taskConent = document.getElementById("input-task").value;

  let newTask = new Task(id + 1, taskConent, false);
  return newTask;
};

function updateTaskList() {
  // update currentUser
  currentUser[0] = {
    ...currentUser[0],
    taskList,
  };

  saveCurrentUser();
  // update userList
  let index = userList.findIndex(
    (user) => user.userName === currentUser[0].userName
  );
  userList.splice(index, 1);
  userList.push(currentUser[0]);
  saveLocalStorage();
}

let addTask = () => {
  let newTask = getNewTask();

  // validate if new task is empty
  if (newTask.taskContent == "") {
    Swal.fire({
      icon: "error",
      title: "Task",
      text: "Cannot be empty!",
    });
    return;
  }

  taskList.push(newTask);
  updateTaskList();

  Swal.fire({
    icon: "success",
    title: "Task",
    text: "Added task!",
  });

  renderTodoList();
};

function renderTodoList() {
  let listContent = "";

  listContent = taskList
    .map((item) => {
      return `<li class="${
        item.isCompleted ? "checked" : null
      }"><p onclick="checkTask('${item.id}')">${
        item.taskContent
      }</p><span onclick="delTask('${item.id}')" class='close'>x</span></li>`;
    })
    .join("");

  document.getElementById("todo-list").innerHTML = listContent;
}

// Render HomePage at first loading
function renderHomePage() {
  if (currentUser.length > 0) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("todo-container").style.display = "block";
    // render todo list the first time page load
    renderTodoList();
  } else {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("todo-container").style.display = "none";
  }
}

renderHomePage();

function test() {
  console.log(1);
}

function delTask(id) {
  taskList.splice(id - 1, 1);
  updateTaskList();

  Swal.fire({
    icon: "success",
    title: "Task",
    text: "Deleted!",
  });
  renderTodoList();
}

function checkTask(id) {
  taskList[id - 1] = {
    ...taskList[id - 1],
    isCompleted: !taskList[id - 1].isCompleted,
  };

  updateTaskList();
  renderTodoList();
}
