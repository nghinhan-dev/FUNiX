// User
class User {
  constructor(_firstName, _lastName, _userName, _password) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.userName = _userName;
    this.password = _password;
  }
}

class Task {
  constructor(_id, _task, _isCompleted) {
    this.id = _id;
    this.task = _task;
    this.isCompleted = _isCompleted;
  }
}

let weed = new User("Lee", "Hyun", "weed", 123123123);

let taskNum1 = new Task(1, "Las Planax", false);
let taskNum2 = new Task(2, "Embiyun", false);
let taskNum3 = new Task(3, "Art Center", false);
let todoList = [taskNum1, taskNum2, taskNum3];

weed = {
  ...weed,
  todoList,
};
console.log("weed:", weed);
