import React from "react";
import { Link } from "react-router-dom";

const Participants = (data) => {
  return (
    <Link to={`/profile/${data?.data?.id}`} className="participant">
      <div className="avatar avatar--medium">
        <img src={`http://localhost:8000${data?.data?.avatar}`} />
      </div>
      <p>
        {data?.data?.name}
        <span>@{data?.data?.username}</span>
      </p>
    </Link>
  );
};

export default Participants;
