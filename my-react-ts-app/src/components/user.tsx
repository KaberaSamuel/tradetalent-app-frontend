import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addUser, userSelector } from "../redux_slices/userSlice";

function UserPage() {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  const users = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  function handleAddUser() {
    const newUser = {
      id: (users.length + 1).toString(),
      name: newUserName,
      email: newUserEmail,
    };
    dispatch(addUser(newUser));
  }

  return (
    <div className="py-2 px-5">
      {users.map((user) => (
        <li key={user.id} className="mb-2">
          {user.id} | {user.name} | {user.email}
        </li>
      ))}
      <div className="px-10 flex gap-5">
        <input
          type="text"
          placeholder="Name"
          aria-label="name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Email"
          aria-label="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        ></input>
        <button type="submit" className="btn" onClick={handleAddUser}>
          Add
        </button>
      </div>
    </div>
  );
}
export default UserPage;
