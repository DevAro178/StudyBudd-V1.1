import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const TopicsListMini = (id) => {
  let [topics, setTopics] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const getTopics = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/GetTopics/", {
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
  }, []);

  return (
    <div className="topics">
      <div className="topics__header">
        <h2>Browse Topics</h2>
      </div>
      <ul className="topics__list">
        <li>
          <a href="/" className={!id.id && "active"}>
            All <span>{topics.length}</span>
          </a>
        </li>
        {topics.map((topic, index) => (
          <li key={topic.id} data-topic-id={topic.id}>
            <a
              href={`/?topicID=${topic.id}`}
              className={
                id && id.id && topic.id.toString() === id.id.toString()
                  ? "active"
                  : ""
              }
            >
              {topic.name} <span>{topic.room_count}</span>
            </a>
          </li>
        ))}
      </ul>
      <Link className="btn btn--link" to="/topics">
        More
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <title>chevron-down</title>
          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
        </svg>
      </Link>
    </div>
  );
};

export default TopicsListMini;
