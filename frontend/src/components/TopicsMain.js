import React, { useState, useEffect } from "react";

const TopicsMain = () => {
  let [topics, setTopics] = useState([]);
  let [topicRoute, setTopicRoute] = useState("GetTopics");

  useEffect(() => {
    const abortController = new AbortController();
    const getTopics = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/${topicRoute}`, {
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
        setTopics(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        }
      }
    };
    getTopics();
    return () => {
      abortController.abort();
    };
  }, [topicRoute]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue) {
      setTopicRoute("GetTopics");
      return;
    }

    setTopicRoute(`SearchTopics/${inputValue}`);
  };

  return (
    <div className="topics-page layout__body scroll">
      <form className="header__search">
        <label>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <title>search</title>
            <path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"></path>
          </svg>
          <input
            id="postSearch"
            onChange={handleInputChange}
            placeholder="Search for posts"
          />
        </label>
      </form>

      <ul className="topics__list">
        {/* <li>
          <a href="/" className="active">
            All <span>553</span>
          </a>
        </li> */}
        <li>
          <a
            onClick={(e) => {
              setTopicRoute("GetTopics");
            }}
            className="active"
          >
            All <span>{topics.length}</span>
          </a>
        </li>

        {topics.map((topic, index) => (
          <li key={topic.id}>
            <a href={`/?topicID=${topic.id}`}>
              {topic.name} <span>{topic.room_count}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsMain;
