import React, { useEffect, useState } from "react";
import Activities from "./Activities";

const ActivitiesList = (restRoute) => {
  let [activities, setActivities] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const getActivities = async () => {
      try {
        let response = await fetch(
          `http://127.0.0.1:8000/${restRoute.restRoute}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            signal: abortController.signal,
          }
        );

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
  }, [restRoute]);
  // useEffect(() => {
  //   console.log(activities);
  // }, [activities]);
  return (
    <div className="activities">
      <div className="activities__header">
        <h2>Recent Activities</h2>
      </div>
      {activities &&
        activities.map((activity) => (
          <Activities key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default ActivitiesList;
