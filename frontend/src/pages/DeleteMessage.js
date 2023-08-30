import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const DeleteMessage = () => {
  let { id } = useParams();
  let [message, setMessage] = useState();

  let { userId, authTokens } = useContext(AuthContext);
  let [deleteMessageFlag, setDeleteMessageFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const getMessage = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/GetMessageByID/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer " + String(authTokens.access),
            },
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setMessage(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getMessage();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (deleteMessageFlag) {
      const deleteMessage = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${authTokens.access}`);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders, // Corrected this
          redirect: "follow",
          signal: signal, // Using the signal here
        };

        try {
          const response = await fetch(
            `http://localhost:8000/DeleteMessage/${message.id}`,
            requestOptions
          );
          if (!response.ok) {
            const data = await response.json(); // Parse the JSON response

            throw new Error("Network response was not ok");
          }
          setDeleteMessageFlag(false);
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
      deleteMessage();
    }
  }, [deleteMessageFlag]);

  const handleClick = (event) => {
    event.preventDefault();
    if (message?.user?.id === userId) {
      setDeleteMessageFlag(true);
      // console.log("hell");
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
              <a href="index.html">
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
              </a>
              <h3>Back</h3>
            </div>
          </div>
          <div className="layout__body">
            <form onSubmit={handleClick} className="form">
              <div className="form__group">
                <p>Are you sure you want to delete "{message?.body}"?</p>
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

export default DeleteMessage;
