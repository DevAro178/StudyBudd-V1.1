import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import TopicsListMini from "../components/TopicsListMini";
import RoomsList from "../components/RoomsList";
import ActivitiesList from "../components/ActivitiesList";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  let [activitiesRoute, setActivitiesRoute] = useState("GetMessages");
  let [roomListRoute, setRoomList] = useState("GetRooms");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve the topicID query parameter
  const topicID = queryParams.get("topicID")
    ? queryParams.get("topicID")
    : null;

  // Retrieve the topicID query parameter
  const roomName = queryParams.get("q") ? queryParams.get("q") : null;

  useEffect(() => {
    if (topicID) {
      console.log(topicID);
      setActivitiesRoute(`GetMessagesByTopicID/${topicID}`);
      setRoomList(`GetRoomsByTopicID/${topicID}`);
    }
  }, [topicID]);

  useEffect(() => {
    if (roomName) {
      console.log(topicID);
      setRoomList(`GetRoomsByTitleName/${roomName}`);
    }
  }, [roomName]);

  // useEffect(() => {
  //   console.log(activitiesRoute, roomListRoute);
  // }, [activitiesRoute, roomListRoute]);

  return (
    <main className="layout layout--3">
      <div className="container">
        {/* Topics Start */}
        <TopicsListMini id={topicID} />
        {/* Topics End */}

        {/* Room List Start */}
        <RoomsList restRoute={roomListRoute} />
        {/* Room List End */}

        {/* Activities Start */}
        <ActivitiesList restRoute={activitiesRoute} />
        {/* Activities End */}
      </div>
    </main>
  );
};

export default HomePage;

// const { authTokens, logoutUser } = useContext(AuthContext);
// let [profile, setProfile] = useState([]);
// let { user, userId, userName, userEmail, isLoggedIn } =
//   useContext(AuthContext);

// // console.log(isLoggedIn);

// useEffect(() => {
//   if (isLoggedIn) {
//     getProfile();
//   }
// }, []);
// const getProfile = async () => {
//   let response = await fetch(
//     "http://127.0.0.1:8000/GetUserProfile/" + user.user_id,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   let data = await response.json();
//   if (response.status === 200) {
//     setProfile(data);
//   } else if (response.statusText === "Unauthorized") {
//     logoutUser();
//   }
// };
