import { useState, useEffect } from "react";
import CustomName from "./customName";

import { useSelector, useDispatch } from "react-redux";

import {
  addUser,
  updateUser,
  clearSelectedUser,
} from "../features/users/userSlice";

function Users() {
  const dispatch = useDispatch();

  // Get data from Redux
  const userData = useSelector((state) => state.users.userData);

  // Get selected user ID from Redux
  const selectedUserId = useSelector((state) => state.users.selectedUserId);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState({});

  const [idToedit, setIdToEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const stateOptions = [
    {
      id: 1,
      name: "maharashtra",
      label: "Maharashtra",
    },
    {
      id: 2,
      name: "gujarat",
      label: "Gujarat",
    },
  ];

  const stateWiseCity = {
    maharashtra: [
      {
        id: 1,
        name: "mumbai",
        Label: "Mumbai",
      },
      {
        id: 2,
        name: "pune",
        Label: "Pune",
      },
      {
        id: 3,
        name: "thane",
        Label: "Thane",
      },
      {
        id: 4,
        name: "nashik",
        Label: "Nashik",
      },
    ],

    gujarat: [
      {
        id: 1,
        name: "ahmedabad",
        Label: "Ahmedabad",
      },
      {
        id: 2,
        name: "surat",
        Label: "Surat",
      },
      {
        id: 3,
        name: "vadodara",
        Label: "Vadodara",
      },
    ],
  };

  // ==========================================
  // WHEN EDIT BUTTON IS CLICKED
  // ==========================================

  useEffect(() => {
    if (selectedUserId !== null) {
      editHandler(selectedUserId);
    }
  }, [selectedUserId]);

  // ==========================================
  // ADD USER BUTTON
  // ==========================================

  const clickToOpenForm = () => {
    resetForm();

    dispatch(clearSelectedUser());

    setShowForm(true);
  };

  // ==========================================
  // FIRST NAME
  // ==========================================

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  // ==========================================
  // LAST NAME
  // ==========================================

  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  // ==========================================
  // DOB
  // ==========================================

  const onDOBChange = (event) => {
    setDob(event.target.value);

    const dobAge = event.target.value;

    const birthDate = new Date(dobAge);
    const todayDate = new Date();

    let newAge = todayDate.getFullYear() - birthDate.getFullYear();

    const monthDiff = todayDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      newAge--;
    }

    setAge(newAge);
  };

  // ==========================================
  // GENDER
  // ==========================================

  const onGenderChange = (event) => {
    setGender(event.target.value);
  };

  // ==========================================
  // STATE
  // ==========================================

  const onStateChange = (event) => {
    setState(event.target.value);

    // Reset city when state changes
    setCity("");
  };

  // ==========================================
  // ADD / UPDATE USER
  // ==========================================

  const addNewUser = (e) => {
    e.preventDefault();

    let newErrorMeg = {};

    // FIRST NAME VALIDATION
    if (!firstName.trim()) {
      newErrorMeg.firstName = "FirstName should not be empty";
    } else if (firstName.length < 2) {
      newErrorMeg.firstName = "Firstname should not be lessthen 2 charater";
    } else if (firstName.length > 50) {
      newErrorMeg.firstName =
        "Firstname should not be greaterthane 50 charater";
    }

    // LAST NAME VALIDATION
    if (!lastName.trim()) {
      newErrorMeg.lastName = "LastName should not be empty";
    } else if (lastName.length < 2) {
      newErrorMeg.lastName = "LastName should not be lessthen 2 charater";
    } else if (lastName.length > 50) {
      newErrorMeg.lastName = "LastName should not be greaterthane 50 charater";
    }

    // DOB VALIDATION
    const todayDate = new Date();
    const selectedDate = new Date(dob);

    if (!dob.trim()) {
      newErrorMeg.dob = "Dob is required";
    } else if (selectedDate > todayDate) {
      newErrorMeg.dob = "Dob should not be a future date";
    }

    // GENDER VALIDATION
    if (!gender) {
      newErrorMeg.gender = "Gender is required";
    }

    // STATE VALIDATION
    if (!state) {
      newErrorMeg.state = "State is required";
    }

    // CITY VALIDATION
    if (!city) {
      newErrorMeg.city = "City is required";
    }

    setError(newErrorMeg);

    // STOP IF VALIDATION ERROR
    if (Object.keys(newErrorMeg).length > 0) {
      return;
    }

    // ==========================================
    // UPDATE USER
    // ==========================================

    if (isEdit) {
      const updatedUser = {
        Id: idToedit,
        FirstName: firstName,
        LastName: lastName,
        DOB: dob,
        Age: age,
        Gender: gender,
        State: state,
        City: city,
      };

      // Send ONE user object to Redux
      dispatch(updateUser(updatedUser));

      // Clear selected user
      dispatch(clearSelectedUser());

      setIsEdit(false);
      setIdToEdit(null);
      setShowForm(false);

      resetForm();

      return;
    }

    // ==========================================
    // ADD NEW USER
    // ==========================================

    const newUserDetailFiled = {
      Id:
        userData.length > 0
          ? Math.max(...userData.map((user) => user.Id)) + 1
          : 1,

      FirstName: firstName,
      LastName: lastName,
      DOB: dob,
      Age: age,
      Gender: gender,
      State: state,
      City: city,
    };

    // Send new user to Redux
    dispatch(addUser(newUserDetailFiled));

    setShowForm(false);

    resetForm();
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setAge("");
    setGender("");
    setState("");
    setCity("");

    setError({});

    setIsEdit(false);
    setIdToEdit(null);
  };

  // ==========================================
  // EDIT USER
  // ==========================================

  const editHandler = (id) => {
    const selectedUser = userData.find((user) => user.Id === id);

    if (!selectedUser) {
      return;
    }

    setIsEdit(true);

    setIdToEdit(id);

    setShowForm(true);

    setFirstName(selectedUser.FirstName);
    setLastName(selectedUser.LastName);
    setDob(selectedUser.DOB);
    setGender(selectedUser.Gender);
    setAge(selectedUser.Age);
    setState(selectedUser.State);
    setCity(selectedUser.City);

    setError({});
  };

  return (
    <>
      {/* TOP SECTION */}

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

      {/* FORM */}

      {showForm && (
        <div className="flex justify-center mt-6">
          <form
            onSubmit={addNewUser}
            className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isEdit ? "Edit User" : "Add User"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* FIRST NAME */}

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

              {/* LAST NAME */}

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

              {/* DOB */}

              <CustomName
                label={"Date Of Birth"}
                type="date"
                value={dob}
                onChange={onDOBChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error.dob && <p className="text-red-500 text-sm">{error.dob}</p>}

              {/* AGE */}

              <CustomName
                label={"Age"}
                type="number"
                value={age}
                readOnly
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* GENDER */}

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

              {/* STATE */}

              <label className="font-medium block mb-2">State</label>

              <select
                value={state}
                onChange={onStateChange}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>

                {stateOptions.map((stateItem) => (
                  <option key={stateItem.id} value={stateItem.name}>
                    {stateItem.label}
                  </option>
                ))}
              </select>

              {error.state && (
                <p className="text-red-500 text-sm">{error.state}</p>
              )}

              {/* CITY */}

              <label className="font-medium block mb-2">City</label>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>

                {stateWiseCity[state]?.map((cities) => (
                  <option key={cities.id} value={cities.name}>
                    {cities.Label}
                  </option>
                ))}
              </select>

              {error.city && (
                <p className="text-red-500 text-sm">{error.city}</p>
              )}

              {/* BUTTONS */}

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {isEdit ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                    dispatch(clearSelectedUser());
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Users;
