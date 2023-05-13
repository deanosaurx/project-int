import { useState, useEffect } from "react";

function UserCard({ user, onDelete }: any) {
  return (
    <div className="usercard" style={{ border: "1px solid black", padding: "10px" }}>
      <p>
        Name: <b>{user.name}</b>
      </p>
      <p>
        Email: <b>{user.email}</b>
      </p>
      <button onClick={() => onDelete(user._id)}>Delete</button>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: any) => {
    fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user: any) => user._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {users.map((user: any) => (
        <UserCard key={user._id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default UserList;
