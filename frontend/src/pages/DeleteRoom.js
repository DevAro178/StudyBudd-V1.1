import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const DeleteRoom = () => {
  const { id } = useParams();
  let [room, setRoom] = useState();
  const [triggerSubmit, setTriggerSubmit] = useState(false);
  const navigate = useNavigate();
  const { userId, authTokens } = useContext(AuthContext);

  useEffect(() => {
    const abortController = new AbortController();
    const getRoom = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/GetRoom/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        // Update the state with the new data
        setRoom(data);
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
    if (!triggerSubmit) {
      return;
    }

    const abortController = new AbortController();

    const DeleteRoom = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${authTokens.access}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders, // Corrected this line
        redirect: "follow",
        signal: signal, // Using the signal here
      };

      try {
        const response = await fetch(
          `http://localhost:8000/DeleteRoom/${id}`,
          requestOptions
        );

        if (!response.ok) {
          const data = await response.json(); // Parse the JSON response

          throw new Error("Network response was not ok");
        }

        const result = await response.text();
        alert("Room has been Deleted");
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

    DeleteRoom();

    // Reset the trigger
    setTriggerSubmit(false);

    return () => {
      abortController.abort();
    };
  }, [triggerSubmit]); // I've added formData to the dependencies as well, just to ensure up-to-date data is used

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room?.host?.id === userId) {
      setTriggerSubmit(true); // Trigger the useEffect
      // console.log("Hi");
    } else {
      navigate("/");
    }
  };

  return (
    <main className="delete-item layout">
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
              <h3>Back</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group">
                <p>Are you sure you want to delete "{room?.name}"?</p>
              </div>

              <div className="for__group">
                <input
                  className="btn btn--main"
                  type="submit"
                  value="Confirm"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeleteRoom;
