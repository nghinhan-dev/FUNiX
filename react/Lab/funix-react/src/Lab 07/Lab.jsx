import { useState } from "react";
import UserInput from "./UserInput/UserInput";

export default function Lab() {
  const [userList, setUserList] = useState([]);

  const addUser = (user) => {
    setUserList((prevState) => {
      const newList = [...prevState];
      newList.unshift(user);
      return newList;
    });
  };

  let renderUserList = userList.map((user) => {
    return (
      <li>
        <h3>
          {user.user} ({user.age} years old)
        </h3>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="grid">
        <UserInput onAddUser={addUser} />
        <div>
          <h2>User List</h2>
          <ul>{renderUserList}</ul>
        </div>
      </div>
    </div>
  );
}
