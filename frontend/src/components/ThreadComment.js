import React, { useContext, useEffect, useState } from "react";
import { timeSince } from "./createdTime";
import AuthContext from "../context/AuthContext";

const ThreadComment = ({ message, flag }) => {
  let { userId, authTokens } = useContext(AuthContext);
  let [deleteMessageFlag, setDeleteMessageFlag] = useState(false);
  // console.log(message.id);

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
          flag(true);
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

  return (
    <div key={message.id} className="thread">
      <div className="thread__top">
        <div className="thread__author">
          <a href="#" className="thread__authorInfo">
            <div className="avatar avatar--small">
              <img src={`http://localhost:8000${message.user.avatar}`} />
            </div>
            <span>@{message.user.username}</span>
          </a>
          <span className="thread__date">{timeSince(message.created)}</span>
        </div>
        {message.user.id === userId && (
          <div
            className="thread__delete"
            onClick={() => {
              setDeleteMessageFlag(true);
            }}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>remove</title>
              <path d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"></path>
            </svg>
          </div>
        )}
      </div>
      <div className="thread__details">{message.body}</div>
    </div>
  );
};

export default ThreadComment;
