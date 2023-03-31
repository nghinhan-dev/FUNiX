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
