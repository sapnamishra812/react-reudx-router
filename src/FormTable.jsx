import { useDispatch, useSelector } from "react-redux";

import { deleteUser, setSelectedUserId } from "./features/users/userSlice";

function FormTable() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.users.userData);

  function editHandler(id) {
    dispatch(setSelectedUserId(id));
  }

  function deleteHandler(id) {
    dispatch(deleteUser(id));
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>

      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Sr No.</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">State</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {userData.map((user) => (
            <tr key={user.Id}>
              <td className="border p-2">{user.Id}</td>

              <td className="border p-2">{user.FirstName}</td>

              <td className="border p-2">{user.LastName}</td>

              <td className="border p-2">{user.DOB}</td>

              <td className="border p-2">{user.Age}</td>

              <td className="border p-2">{user.Gender}</td>

              <td className="border p-2">{user.State}</td>

              <td className="border p-2">{user.City}</td>

              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => editHandler(user.Id)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteHandler(user.Id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FormTable;
