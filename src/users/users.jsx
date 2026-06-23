import React, { useState } from "react";
import CustomName from "./customName";
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
  const [error, setError] = useState({});

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
    console.log("DOB", event.target.value);
    setDob(event.target.value);
  };
  const onGenderChange = (event) => {
    setGender(event.target.value);
  };
  const onStateChange = (event) => {
    setState(event.target.value);
  };
  const addNewUser = (e) => {
    e.preventDefault();

    //validation for firtsname
    let newErrorMeg = {};
    if (!firstName.trim()) {
      newErrorMeg.firstName = "FirstName should not be empty";
    } else if (firstName.length < 2) {
      newErrorMeg.firstName = "Firstname should not be lessthen 2 charater";
    } else if (firstName.length > 50) {
      newErrorMeg.firstName =
        "Firstname should not be greaterthane  50 charater";
    }
    if (!lastName.trim()) {
      newErrorMeg.lastName = "LastName should not be empty";
    } else if (lastName.length < 2) {
      newErrorMeg.lastName = "LastName should not be lessthen 2 charater";
    } else if (lastName.length > 50) {
      newErrorMeg.lastName = "LastName should not be greaterthane  50 charater";
    }

    //dob validation
    const todayDate = new Date();
    const selectedDate = new Date(dob);

    if (!dob.trim()) {
      newErrorMeg.dob = "Dob is required";
    } else if (selectedDate > todayDate) {
      newErrorMeg.dob = "Dob should not be a future date ";
    }
    if (!gender) {
      newErrorMeg.gender = "Gender is required";
    }
    if (!state) {
      newErrorMeg.state = "State is required";
    }
    if (!city) {
      newErrorMeg.city = "City is required";
    }

    console.log(newErrorMeg);
    setError(newErrorMeg);
    if (Object.keys(newErrorMeg).length > 0) {
      return;
    }

    const newUserDetailFiled = {
      Id: Math.random(),
      FirstName: firstName,
      LastName: lastName,
      DOB: dob,
      Age: age,
      Gender: gender,
      State: state,
      City: city,
    };
    //console.log("newUserDetailFiled", newUserDetailFiled);
    setUserData([...userData, newUserDetailFiled]);

    resetForm();
    setShowForm(false);
  };
  // console.log(userData);
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

  const stateOptions = [
    { id: 1, name: "maharashtra", label: "Maharashtra" },
    { id: 2, name: "gujarat", label: "Gujarat" },
  ];
  const stateWiseCity = {
    maharashtra: [
      { id: 1, name: "mumbai", Label: "Mumbai" },
      { id: 2, name: "pune", Label: "Pune" },
      { id: 3, name: "thane", Label: "Thane" },
      { id: 4, name: "nashik", Label: "Nashik" },
    ],
    gujarat: [
      { id: 1, name: "ahmedabad", Label: "Ahmedabad" },
      { id: 2, name: "surat", Label: "Surat" },
      { id: 3, name: "vadodara", Label: "Vadodara" },
    ],
  };
  // const notFutureDateSelect = new Date().toISOString().split("T")[0];
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
              <CustomName
                label={"First Name"}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={onFirstNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.firstName && (
                <p className="text-red-500 text-sm">{error.firstName}</p>
              )}
              {/* <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={onFirstNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}

              {/* <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={onLastNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
              <CustomName
                label={"Last Name"}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={onLastNameChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.lastName && (
                <p className="text-red-500 text-sm">{error.lastName}</p>
              )}

              {/* <input
                type="date"
                value={dob}
                onChange={onDOBChange}
                // max={notFutureDateSelect}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
              <CustomName
                label={"Date Of Birth"}
                type="date"
                value={dob}
                onChange={onDOBChange}
                // max={notFutureDateSelect}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.dob && <p className="text-red-500 text-sm">{error.dob}</p>}

              {/* <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={onAgeChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
              <CustomName
                label={"Age"}
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
              {error.gender && (
                <p className="text-red-500 text-sm">{error.gender}</p>
              )}

              <label className="font-medium block mb-2">State</label>
              <select
                value={state}
                onChange={onStateChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {/* <option value="">Select State</option>
                <option value="1">Maharashtra</option>
                <option value="2">Gujarat</option> */}
                {stateOptions.map((state) => {
                  return <option value={state.name}>{state.label}</option>;
                })}{" "}
              </select>
              {error.state && (
                <p className="text-red-500 text-sm">{error.state}</p>
              )}
              <label className="font-medium block mb-2">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stateWiseCity[state]?.map((cities) => (
                  <option key={cities.id} value={cities.name}>
                    {cities.Label}
                  </option>
                ))}
              </select>
              {error.city && (
                <p className="text-red-500 text-sm">{error.city}</p>
              )}
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
                <td className="border p-2">{user.DOB}</td>
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
