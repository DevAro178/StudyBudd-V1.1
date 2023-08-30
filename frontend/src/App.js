import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider

import { store } from "./redux/store"; // Import your store

import { AuthProvider } from "./context/AuthContext";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Topics from "./pages/Topics";
import Activity from "./pages/Activity";
import CreateRoom from "./pages/CreateRoom";
import DeleteRoom from "./pages/DeleteRoom";
import EditUser from "./pages/EditUser";
import MyComponent from "./pages/MyComponent";
import PrivateRoute from "./utils/PrivateRoute";
import DeleteMessage from "./pages/DeleteMessage";
import UpdateRoom from "./pages/UpdateRoom";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your app with Provider */}
      <div className="App">
        <Router>
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/room/:id" element={<Room />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/activity" element={<Activity />} />
              {/* <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} /> */}
              <Route
                path="/create-room"
                element={
                  <PrivateRoute>
                    <CreateRoom />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-room/:id"
                element={
                  <PrivateRoute>
                    <UpdateRoom />
                  </PrivateRoute>
                }
              />
              <Route
                path="/delete-room/:id"
                element={
                  <PrivateRoute>
                    <DeleteRoom />
                  </PrivateRoute>
                }
              />
              {/* <Route path="/delete-message/:id" element={<DeleteMessage />} /> */}
              <Route
                path="/delete-message/:id"
                element={
                  <PrivateRoute>
                    <DeleteMessage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-user/"
                element={
                  <PrivateRoute>
                    <EditUser />
                  </PrivateRoute>
                }
              />
              <Route path="/" exact element={<HomePage />} />
              <Route path="/MyComponent" exact element={<MyComponent />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
