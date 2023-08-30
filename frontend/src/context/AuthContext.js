import { createContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  setUser,
  setAuthTokens,
  setLoading,
  setUserName,
  setUserEmail,
  setIsLoggedIn,
  setPrevLocation,
  resetUserData,
} from "../redux/userData";
import { persistor } from "../redux/store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    authTokens,
    userId,
    userName,
    userEmail,
    isLoggedIn,
    loading,
    userData,
    prevLocation,
  } = useSelector((state) => state.userData);

  let loginUser = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    let data = await response.json();

    if (data) {
      // localStorage.setItem("authTokens", JSON.stringify(data));
      dispatch(setAuthTokens(data));
      dispatch(setUser(jwtDecode(data.access)));
      dispatch(setUserId(data.user_id));
      dispatch(setUserEmail(data.email));
      dispatch(setUserName(data.username));
      dispatch(setIsLoggedIn(true));
      if (prevLocation) {
        navigate(prevLocation);
      } else {
        navigate("/");
      }
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  let logoutUser = () => {
    // localStorage.removeItem("authTokens");
    // dispatch(setAuthTokens(null));
    // dispatch(setUser(null));
    // dispatch(setUserId(null));
    // dispatch(setUserEmail(null));
    // dispatch(setUserName(null));
    // persistor.purge();
    dispatch(resetUserData());
    dispatch(setIsLoggedIn(false));
  };

  const updateToken = async () => {
    const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const data = await response.json();
    if (response.status === 200) {
      dispatch(setAuthTokens(data));
      dispatch(setUser(jwtDecode(data.access)));
      // localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      dispatch(setLoading(false));
    }
  };

  let contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    userId,
    userName,
    userEmail,
    isLoggedIn,
    userData,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const REFRESH_INTERVAL = 1000 * 59 * 1; // 24 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
