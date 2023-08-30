import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { setPrevLocation } from "../redux/userData"; // Adjust the path
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  let location = useLocation();
  const dispatch = useDispatch();

  if (!user) {
    // Dispatch the setPrevLocation action before redirecting
    dispatch(setPrevLocation(location));
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
