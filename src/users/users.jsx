import React, { useState } from "react";

function Users() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [userData, setUserData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reset, setReset] = useState(false);

  // click add button
  const clickToOpenForm = () => {
    console.log("open form");
    setShowForm(true);
  };

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const onAgeChange = (event) => {
    setAge(event.target.value);
  };

  const onDOBChange = (event) => {
    setDob(event.target.value);
  };
  const onGenderChange = (event) => {
    setGender(event.target.value);
  };
  const onStateChange = (event) => {
    setState(event.target.value);

    console.log("state Value", event.target.value);
  };
  const addNewUser = (e) => {
    e.preventDefault();
    console.log("add new user");
    // const citySelectEDBYiD = city
    const newUserDetailFiled = {
      Id: Math.random() + 1,
      FirstName: firstName,
      LastName: lastName,
      DOB: dob,
      Age: age,
      Gender: gender,
      State: state,
      City: city,
    };
    setUserData([...userData, newUserDetailFiled]);

    resetForm();
  };
  console.log(userData);
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setAge("");
    setGender("");
    setState("");
    setCity("");
    setReset(true);
  };

  return (
    <>
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={clickToOpenForm}
        >
          Add User
        </button>

        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Filter
        </button>
      </div>
      //add form here
      {showForm && (
        <div className="flex justify-center mt-6">
          <form
            onSubmit={addNewUser}
            className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={onFirstNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={onLastNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="date"
                value={dob}
                onChange={onDOBChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={onAgeChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div>
                <label className="font-medium block mb-2">Gender</label>
                <div className="flex gap-4">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={onGenderChange}
                    />{" "}
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={onGenderChange}
                    />{" "}
                    Female
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={gender === "Other"}
                      onChange={onGenderChange}
                    />{" "}
                    Other
                  </label>
                </div>
              </div>

              <select
                value={state}
                onChange={onStateChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                <option value="1">Maharashtra</option>
                <option value="2">Gujarat</option>
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>
                <option value="1">Mumbai</option>
                <option value="2">Pune</option>
                <option value="3">Ahmedabad</option>
              </select>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      // show user data in table here
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

        {userData.map((user) => {
          return (
            <tbody>
              <tr key={user.Id}>
                <td className="border p-2">{user.Id}</td>
                <td className="border p-2">{user.FirstName}</td>
                <td className="border p-2">{user.LastName}</td>
                <td className="border p-2">{user.DateOfBirth}</td>
                <td className="border p-2">{user.Age}</td>
                <td className="border p-2">{user.Gender}</td>
                <td className="border p-2">{user.State}</td>
                <td className="border p-2">{user.City}</td>

                <td className="border p-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
              ;
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default Users;
