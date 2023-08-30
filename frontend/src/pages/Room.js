import React, { useContext, useEffect, useState } from "react";
import Participants from "../components/Participants";
import { Link, useParams } from "react-router-dom";
import ThreadComment from "../components/ThreadComment";
import { timeSince } from "../components/createdTime";
import { formatNumber } from "../components/CountFormat";
import AuthContext from "../context/AuthContext";
import { useSelector } from "react-redux";

function Room() {
  let { id } = useParams();
  // let { userId, authTokens } = useContext(AuthContext);
  const { authTokens, userId } = useSelector((state) => state.userData);

  let [roomDetails, setRoomDetails] = useState([]);
  let [roomMessages, setRoomMessages] = useState([]);
  let [newMessage, setNewMessage] = useState("");
  let [submitFlag, setSubmitFlag] = useState(false);
  let [deleteFlag, setDeleteFlag] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const getRoomDetails = async () => {
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
        setRoomDetails(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getRoomDetails();

    return () => {
      abortController.abort();
    };
  }, [submitFlag]);
  useEffect(() => {
    // if (!submitFlag) {
    if (!submitFlag || deleteFlag) {
      const abortController = new AbortController();
      const getRoomMessages = async () => {
        try {
          let response = await fetch(
            `http://127.0.0.1:8000/GetMessagesByRoomID/${id}`,
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
          setRoomMessages(data);
          setDeleteFlag(false);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(
              "There was a problem with the fetch operation:",
              error.message
            );
          }
        }
      };
      getRoomMessages();
      return () => {
        abortController.abort();
      };
    }
  }, [submitFlag, deleteFlag]);
  // }, [submitFlag]);
  useEffect(() => {
    if (submitFlag) {
      const createMessage = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${authTokens.access}`);

        const raw = JSON.stringify({
          room: id,
          body: newMessage,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders, // Corrected this line
          body: raw,
          redirect: "follow",
          signal: signal, // Using the signal here
        };

        try {
          const response = await fetch(
            "http://localhost:8000/CreateMessage/",
            requestOptions
          );
          if (!response.ok) {
            const data = await response.json(); // Parse the JSON response

            throw new Error("Network response was not ok");
          }
          setSubmitFlag(false);
          setNewMessage("");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(
              "There was a problem with the fetch operation:",
              error.message
            );
          }
        }
      };

      createMessage();
    }
  }, [submitFlag]);

  const CreateNewMessage = (event) => {
    event.preventDefault();
    // console.log(newMessage);
    setSubmitFlag(true);
  };

  return (
    <main className="profile-page layout layout--2">
      <div className="container">
        {/* Room Start */}
        <div className="room">
          <div className="room__top">
            <div className="room__topLeft">
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
              <h3>Study Room</h3>
            </div>

            {roomDetails?.host?.id === userId && (
              <div className="room__topRight">
                <Link to={`/update-room/${id}`}>
                  <svg
                    enableBackground="new 0 0 24 24"
                    height="32"
                    viewBox="0 0 24 24"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>edit</title>
                    <g>
                      <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                    </g>
                    <g>
                      <g>
                        <path d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z" />
                      </g>
                      <g>
                        <path d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z" />
                      </g>
                    </g>
                  </svg>
                </Link>
                <Link to={`/delete-room/${id}`}>
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
                </Link>
              </div>
            )}

            {/* <button
              className="action-button"
              data-id="120"
              data-delete-url="https://randomuser.me/api/3324923"
              data-edit-url="profile.html"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>ellipsis-horizontal</title>
                <path d="M16 7.843c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 1.98c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
                <path d="M16 19.908c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 14.046c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
                <path d="M16 31.974c-2.156 0-3.908-1.753-3.908-3.908s1.753-3.908 3.908-3.908c2.156 0 3.908 1.753 3.908 3.908s-1.753 3.908-3.908 3.908zM16 26.111c-1.077 0-1.954 0.877-1.954 1.954s0.877 1.954 1.954 1.954c1.077 0 1.954-0.877 1.954-1.954s-0.877-1.954-1.954-1.954z"></path>
              </svg>
            </button> */}
          </div>
          <div className="room__box scroll">
            {roomDetails && (
              <div className="room__header scroll">
                <div className="room__info">
                  <h3>{roomDetails?.name}</h3>
                  <span>{timeSince(roomDetails?.created)}</span>
                </div>
                <div className="room__hosted">
                  <p>Hosted By</p>
                  <a href="#" className="room__author">
                    <div className="avatar avatar--small">
                      <img
                        src={`http://localhost:8000${roomDetails?.host?.avatar}`}
                      />
                    </div>
                    <span>@{roomDetails?.host?.username}</span>
                  </a>
                </div>
                <div className="room__details">{roomDetails?.description}</div>
                <span className="room__topics">{roomDetails?.topic?.name}</span>
              </div>
            )}
            <div className="room__conversation">
              <div className="threads scroll">
                {roomMessages.map((mesage, index) => (
                  <ThreadComment
                    message={mesage}
                    key={index}
                    flag={setDeleteFlag}
                  />
                ))}
              </div>
            </div>
          </div>
          {userId && (
            <div className="room__message">
              <form onSubmit={CreateNewMessage}>
                <input
                  name=""
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  placeholder="Write your message here..."
                  value={newMessage}
                />
              </form>
            </div>
          )}
        </div>
        {/* Room End */}

        {/*   Start */}
        <div className="participants">
          <h3 className="participants__top">
            Participants{" "}
            <span>
              ({roomDetails && formatNumber(roomDetails?.participants?.length)}{" "}
              Joined)
            </span>
          </h3>
          <div className="participants__list scroll">
            {roomDetails &&
              roomDetails?.participants?.map((participant) => (
                <Participants data={participant} />
              ))}
          </div>
        </div>
        {/*  End */}
      </div>
    </main>
  );
}

export default Room;
