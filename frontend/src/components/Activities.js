import React, { useContext, useEffect, useState } from "react";
import { timeSince } from "./createdTime";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Activities = ({ activity }) => {
  let { userId } = useContext(AuthContext);

  return (
    <div className="activities__box">
      <div className="activities__boxHeader roomListRoom__header">
        <Link
          to={`/profile/${activity.user.id}`}
          className="roomListRoom__author"
        >
          <div className="avatar avatar--small">
            <img src={`http://localhost:8000/${activity.user.avatar}`} />
          </div>
          <p>
            @{activity.user.email}
            <span>{timeSince(activity.created)}</span>
          </p>
        </Link>
        {activity?.user?.id === userId && (
          <div className="roomListRoom__actions">
            <Link to={`delete-message/${activity?.id}`}>
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
      </div>
      <div className="activities__boxContent">
        <p>
          replied to post “
          <Link to={`/room/${activity.room.id}`}>{activity.room.name}</Link>”
        </p>
        <div className="activities__boxRoomContent">{activity.body}</div>
      </div>
    </div>
  );
};

export default Activities;
