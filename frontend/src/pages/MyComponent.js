import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../redux/userData"; // Import the action

function MyComponent() {
  // To dispatch actions
  const dispatch = useDispatch();

  // Get data from the store
  const userId = useSelector((state) => state.userData.user_id);

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
