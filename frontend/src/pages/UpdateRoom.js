import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import AuthContext from "../context/AuthContext";

const UpdateRoom = () => {
  const navigate = useNavigate();
  let { authTokens } = useContext(AuthContext);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    roomName: "",
    topic: "",
    aboutRoom: "",
  });

  const [triggerSubmit, setTriggerSubmit] = useState(false);

  let [topics, setTopics] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const getRoom = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/GetRoom/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + String(authTokens.access),
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        const newData = {
          roomName: data.name,
          topic: data.topic.name,
          aboutRoom: data.description,
        };

        // Update the state with the new data
        setFormData(newData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getRoom();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const getTopics = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/GetTopics/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + String(authTokens.access),
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setTopics(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getTopics();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (!triggerSubmit) {
      return;
    }

    const abortController = new AbortController();

    const UpdateRoom = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${authTokens.access}`);

      const raw = JSON.stringify({
        topic: formData.topic,
        name: formData.roomName,
        description: formData.aboutRoom,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders, // Corrected this line
        body: raw,
        redirect: "follow",
        signal: signal, // Using the signal here
      };

      try {
        const response = await fetch(
          `http://localhost:8000/UpdateRoom/${id}`,
          requestOptions
        );

        if (!response.ok) {
          const data = await response.json(); // Parse the JSON response

          if (
            response.status === 400 &&
            data === "A room with this name and topic already exists." // Check the "detail" property in the JSON response
          ) {
            alert("A room with this name and topic already exists.");
          }

          throw new Error("Network response was not ok");
        }

        const result = await response.text();
        alert("Your Room has been updated");
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

    UpdateRoom();

    // Reset the trigger
    setTriggerSubmit(false);

    return () => {
      abortController.abort();
    };
  }, [triggerSubmit, formData]); // I've added formData to the dependencies as well, just to ensure up-to-date data is used

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Proceed with the rest of the form submission logic
    setTriggerSubmit(true); // Trigger the useEffect
  };

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const setTopic = (value) => {};
  const setAboutRoom = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      aboutRoom: value,
    }));
  };
  // Handle form submission

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
              <h3>Update Study Room</h3>
            </div>
          </div>
          <div className="layout__body scroll">
            <form className="form" onSubmit={handleSubmit}>
              <InputField
                props={{
                  id: "roomName",
                  name: "roomName",
                  type: "text",
                  label: "Room Name",
                  placeholder: "E.g. Mastering Python + Django",
                  required: true,
                  value: formData.roomName,
                  onChange: handleInputChange,
                }}
              />

              <div className="form__group">
                <label htmlFor="room_topic">Topic</label>
                <input
                  required
                  type="text"
                  name="topic"
                  id="room_topic"
                  list="topic-list"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      topic: e.target.value,
                    }))
                  }
                />
                <datalist id="topic-list">
                  <select id="room_topic">
                    <option value="">Select your topic</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </datalist>
              </div>

              <div className="form__group">
                <label htmlFor="room_about">About</label>
                <textarea
                  name="room_about"
                  id="room_about"
                  placeholder="Write about your study group..."
                  value={formData.aboutRoom}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      aboutRoom: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="form__action">
                <Link className="btn btn--dark" to="/">
                  Cancel
                </Link>
                <button className="btn btn--main" type="submit">
                  Update Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateRoom;
