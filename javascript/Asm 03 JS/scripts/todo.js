let getNewTask = () => {
  let id = todoList.length;
  let task = document.getElementById("input-task").value;

  if (task == "") {
    Swal.fire({
      icon: "error",
      title: "Task",
      text: "Cannot be empty!",
    });
    return;
  }

  let listItem = new Task(task, false);
  return listItem;
};

let addTask = () => {};

let renderTodoList = () => {
  let listContent = ``;

  listContent += todoList.map((item) => {
    return `
    <li>
      <p>${item.task}</p>
      <span class="close">x</span>
    </li>            
    `;
  });

  document.getElementById("todo-list").innerHTML = listContent;
};

// Render HomePage at first loading
function renderHomePage() {
  if (currentUser.length > 0) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("todo-container").style.display = "block";
  } else {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("todo-container").style.display = "none";
  }
}

renderHomePage();

function test() {
  console.log(1);
}

function liTest() {
  console.log(10);
}
