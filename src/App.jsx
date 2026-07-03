import { useState } from "react";
import FormTable from "./FormTable";
import Users from "./users/users";

function App() {
  const [userData, setUserData] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  function editHandlerFucntionCall(id) {
    console.log("hiii", id);
    setSelectedUser(id);
  }
  return (
    <>
      <Users
        userData={userData}
        setUserData={setUserData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <FormTable
        userData={userData}
        setUserData={setUserData}
        //setSelectedUser={setSelectedUser}
        // nameChangeHandler={nameChangeHandler} paass table
        editHandlerFucntionCall={editHandlerFucntionCall}
      />
    </>
  );
}

export default App;
