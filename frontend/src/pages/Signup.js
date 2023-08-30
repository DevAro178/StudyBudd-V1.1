import React, { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    c_pass: "",
    pass: "",
  });

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CreateUser = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: formData.email,
      name: formData.fullName,
      password: formData.pass,
      username: formData.username,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      signal: signal,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/CreateUserProfilea",
        requestOptions
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error("Network response was not ok");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.pass !== formData.c_pass) {
      alert("Passwords do not match!");
      return;
    }

    console.log(formData);

    CreateUser();
  };
  return (
    <main className="auth layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Sign up</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Find your study partner</h2>

            <form className="form" onSubmit={handleSubmit}>
              <InputField
                props={{
                  id: "email",
                  name: "email",
                  type: "email",
                  label: "Email Address",
                  placeholder: "Enter your email",
                  required: true,
                  value: formData.email,
                  onChange: handleInputChange,
                }}
              />
              <InputField
                props={{
                  id: "fullName",
                  name: "fullName",
                  type: "text",
                  label: "Full Name",
                  placeholder: "Enter your full name",
                  required: true,
                  value: formData.fullName,
                  onChange: handleInputChange,
                }}
              />
              <InputField
                props={{
                  id: "username",
                  name: "username",
                  type: "text",
                  label: "Username",
                  placeholder: "@aro786",
                  required: true,
                  value: formData.username,
                  onChange: handleInputChange,
                }}
              />
              <InputField
                props={{
                  id: "pass",
                  name: "pass",
                  type: "password",
                  label: "Password",
                  placeholder: "*********",
                  required: true,
                  value: formData.pass,
                  onChange: handleInputChange,
                }}
              />
              <InputField
                props={{
                  id: "c_pass",
                  name: "c_pass",
                  type: "password",
                  label: "Confirm Password",
                  placeholder: "*********",
                  required: true,
                  value: formData.c_pass,
                  onChange: handleInputChange,
                }}
              />

              <button className="btn btn--main" type="submit">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>lock</title>
                  <path d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"></path>
                  <path d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"></path>
                </svg>
                Sign Up
              </button>
            </form>

            <div className="auth__action">
              <p>Already have an account?</p>
              <a href="login.html" className="btn btn--link">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
