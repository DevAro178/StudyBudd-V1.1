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
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  // let userId = authTokens?.user_id || null;

  // let user = authTokens?.access || null;
  // let userEmail = authTokens?.email || null;
  // let userName = authTokens?.username || null;
  let isLoggedIn = localStorage.getItem("authTokens") ? true : false;

  // console.log(authTokens, userId, user, userEmail, userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    userId,
    userName,
    userEmail,
    // isLoggedIn,
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
      localStorage.setItem("authTokens", JSON.stringify(data));
      dispatch(setUser(data.access));
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
    // console.log("Logout triggered");
    localStorage.removeItem("authTokens");
    dispatch(resetUserData());
    persistor.purge();
    // dispatch(setAuthTokens(null));
    // dispatch(setUser(null));
    // dispatch(setUserId(null));
    // dispatch(setUserEmail(null));
    // dispatch(setUserName(null));
    // dispatch(setIsLoggedIn(false));
  };

  const updateToken = async (token) => {
    if (token) {
      // console.log("Update Token Running");

      const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: token }),
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }

      if (loading) {
        dispatch(setLoading(false));
      }
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

    const REFRESH_INTERVAL = 1000 * 60 * 59; // 24 minutes
    let interval = setInterval(() => {
      if (authTokens) {
        let UpdateAuthTokens = localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null;
        let refreshToken = UpdateAuthTokens?.refresh;
        // console.log(refreshToken);

        updateToken(refreshToken);
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
