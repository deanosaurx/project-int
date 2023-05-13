import { useState } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="App">
        <CreateUser />
      </div>
      <div className="usercard">
        <UserList />
      </div>
    </div>
  );
}

export default App;
