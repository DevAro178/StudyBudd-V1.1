import React, { useEffect, useState } from "react";
import MobileSearchMenu from "./MobileSearchMenu";
import Room from "./Room";
import { Link } from "react-router-dom";

const RoomsList = (restRoute) => {
  let [rooms, setRooms] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const getRooms = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/${restRoute.restRoute}`,
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
        setRooms(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getRooms();

    return () => {
      abortController.abort();
    };
  }, [restRoute]);
  // useEffect(() => {
  //   console.log(rooms);
  // }, [rooms]);
  return (
    <div className="roomList">
      <MobileSearchMenu />
      <div className="roomList__header">
        <div>
          <h2>Study Room</h2>
          <p>
            {rooms && Intl.NumberFormat().format(rooms.length)} Rooms available
          </p>
        </div>
        <Link className="btn btn--main" to="/create-room">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <title>add</title>
            <path d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"></path>
          </svg>
          Create Room
        </Link>
      </div>
      {rooms && rooms.map((room) => <Room key={room.id} room={room} />)}
    </div>
  );
};

export default RoomsList;
