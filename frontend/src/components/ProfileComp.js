import React, { useEffect, useState } from "react";
import Room from "./Room";
import { Link, useParams } from "react-router-dom";

const ProfileComp = () => {
  let { id } = useParams();
  let [rooms, setRooms] = useState();
  let [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const getRooms = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/GetRoomsByUserID/${id}`,
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
    const getUserProfile = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/GetUserProfile/${id}`,
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
        setUserProfile(data);
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
    getUserProfile();

    return () => {
      abortController.abort();
    };
  }, []);
  //   useEffect(() => {
  //     console.log(rooms);
  //     console.log(userProfile);
  //   }, [rooms]);
  return (
    <div className="roomList">
      {userProfile && (
        <div className="profile">
          <div className="profile__avatar">
            <div className="avatar avatar--large active">
              <img src={`http://localhost:8000/${userProfile.avatar}`} />
            </div>
          </div>
          <div className="profile__info">
            <h3>{userProfile.name}</h3>
            <p>@{userProfile.username}</p>
            <Link to={`/edit-user/${id}`} className="btn btn--main btn--pill">
              Edit Profile
            </Link>
            {/* <a href="edit-user.html" className="btn btn--main btn--pill">
              
            </a> */}
          </div>
          <div className="profile__about">
            <h3>About</h3>
            <p>{userProfile.bio}</p>
          </div>
        </div>
      )}

      <div className="roomList__header">
        <div>
          <h2>Study Rooms Hosted by dennis_ivy</h2>
        </div>
      </div>
      <div>
        {rooms &&
          rooms.map((room, index) => <Room room={room} index={index} />)}
      </div>
    </div>
  );
};

export default ProfileComp;
