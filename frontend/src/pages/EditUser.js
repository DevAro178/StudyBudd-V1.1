import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  let { authTokens, userId, userData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: userData?.name,
    email: userData?.email,
    username: userData?.username,
    bio: userData?.bio,
    avatar: null,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [triggerSubmit, setTriggerSubmit] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    `http://localhost:8000${userData?.avatar}`
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // This sets the blob URL as the preview
        const name = e.target.name;
        const value = e.target.files[0];
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(formData);
    // return;
    if (!triggerSubmit) {
      return;
    }

    const abortController = new AbortController();

    const UpdateUserProfile = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${authTokens.access}`);

      var data = new FormData();
      data.append("email", formData.email);
      data.append("username", formData.username);
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      if (formData.avatar !== null) {
        data.append("avatar", formData.avatar);
      }

      const requestOptions = {
        method: "PUT",
        headers: myHeaders, // Corrected this line
        body: data,
        redirect: "follow",
        signal: signal, // Using the signal here
      };

      try {
        const response = await fetch(
          `http://localhost:8000/UpdateUserProfile/${userId}`,
          requestOptions
        );

        if (!response.ok) {
          const data = await response.json();
          const errorMessage = data?.error || "Network response was not ok";
          throw new Error(errorMessage);
        }

        const result = await response.text();
        alert("Your Profile has been updated");
        navigate("/");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    UpdateUserProfile();

    // Reset the trigger
    setTriggerSubmit(false);

    return () => {
      abortController.abort();
    };
  }, [triggerSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTriggerSubmit(true);
  };

  return (
    <main className="create-room layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <Link to="/">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>arrow-left</title>
                  <path d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"></path>
                </svg>
              </Link>
              <h3>Settings</h3>
            </div>
          </div>

          <div className="settings layout__body">
            <div className="settings__avatar">
              <div className="avatar avatar--large active">
                <img src={imagePreview} alt="Avatar Preview" />
              </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group form__avatar">
                <label htmlFor="avatar">Upload Avatar</label>
                <input
                  className="form__hide"
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImageChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  placeholder="E.g. john@email.com"
                  readOnly
                />
              </div>

              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="E.g. John doe"
                />
              </div>

              <div className="form__group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="user_bio">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Write about yourself..."
                ></textarea>
              </div>
              <div className="form__action">
                <Link className="btn btn--dark" to="/">
                  Cancel
                </Link>
                <button className="btn btn--main" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditUser;
