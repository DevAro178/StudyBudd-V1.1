import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../redux/userData"; // Import the action
import AuthContext from "../context/AuthContext";

function MyComponent() {
  // To dispatch actions
  const dispatch = useDispatch();

  // Get data from the store
  let { userId } = useContext(AuthContext);

  // Example function that dispatches an action
  const handleUpdateUserId = (newId) => {
    dispatch(setUserId(newId));
  };

  return (
    <div>
      <p>User ID: {userId}</p>
      <button onClick={() => handleUpdateUserId(123)}>
        Set User ID to 123
      </button>
    </div>
  );
}

export default MyComponent;
