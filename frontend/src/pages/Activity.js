import React, { useState, useEffect } from "react";
import ActivitiesPageComponent from "../components/ActivitiesPageComponent";
import { Link } from "react-router-dom";

const Activity = () => {
  let [activities, setActivities] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const getActivities = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/GetMessages`, {
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
        setActivities(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };

    getActivities();

    return () => {
      abortController.abort();
    };
  }, []);
  // useEffect(() => {
  //   console.log(activities);
  // }, [activities]);

  return (
    <main className="layout">
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
              <h3>Recent Activities</h3>
            </div>
          </div>

          <div className="activities-page layout__body scroll">
            {activities &&
              activities.map((activity, index) => (
                <ActivitiesPageComponent activity={activity} index={index} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Activity;
