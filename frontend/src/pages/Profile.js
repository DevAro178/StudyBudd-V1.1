import React from "react";
import TopicsListMini from "../components/TopicsListMini";
import ActivitiesList from "../components/ActivitiesList";
import ProfileComp from "../components/ProfileComp";
import { useParams } from "react-router-dom";

function Profile() {
  let { id } = useParams();
  return (
    <main className="profile-page layout layout--3">
      <div className="container">
        {/* Topics Start */}
        <TopicsListMini />
        {/* Topics End */}

        {/* Room List Start */}
        <ProfileComp />
        {/* Room List End */}

        {/* Activities Start */}
        <ActivitiesList restRoute={`GetMessagesByUserID/${id}`} />
        {/* Activities End */}
      </div>
    </main>
  );
}

export default Profile;
