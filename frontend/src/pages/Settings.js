import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Settings() {
  //
  let [settings, setSettings] = useState();
  let [name, setName] = useState(null);
  let [bio, setBio] = useState(null);
  const user_id = 2;
  useEffect(() => {
    const abortController = new AbortController();
    const getsettings = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/GetUserProfile/${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setSettings(data);
        setName(settings.name);
        setBio(settings.bio);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getsettings();

    return () => {
      abortController.abort();
    };
  }, []);
  useEffect(() => {
    console.log(settings);
  }, [settings]);

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

          {settings && (
            <div className="settings layout__body">
              <div className="settings__avatar">
                <div className="avatar avatar--large active">
                  <img
                    src={`http://localhost:8000${settings?.avatar}`}
                    id="preview-avatar"
                  />
                </div>
              </div>
              <form className="form" action="#">
                <div className="form__group form__avatar">
                  <label for="avatar">Upload Avatar</label>
                  <input
                    className="form__hide"
                    required
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
                <div className="form__group">
                  <label for="name">Full Name</label>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Dennis Ivy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <label for="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={`@${settings?.username}`}
                  />
                </div>
                <div className="form__group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={settings?.email}
                  />
                </div>
                <div className="form__group">
                  <label for="about">About</label>
                  <textarea
                    name="about"
                    id="about"
                    placeholder="Write about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
                <div className="form__action">
                  <a className="btn btn--dark" href="profile.html">
                    Cancel
                  </a>
                  <button className="btn btn--main" type="submit">
                    Update Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Settings;
