import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Comments from "../utils/Comments";
import Likes from "../utils/Likes";

const Home = () => {
  const [forum, setForum] = useState("");
  const [forumList, setForumList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        console.log("Authenticated");
      }
    };
    checkUser();
  }, [navigate]);

  const createForum = () => {
    fetch("http://localhost:8000/api/create/forum", {
      method: "POST",
      body: JSON.stringify({
        forum,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setForumList(data.forums);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createForum();
    setForum("");
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Forum</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home_container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={forum}
              onChange={(e) => setForum(e.target.value)}
            />
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>

        <div className="thread__container">
          {forumList.map((forum) => (
            <div className="thread__item" key={forum.id}>
              <p>{forum.title}</p>
              <div className="react_container">
                <Likes numberOfLikes={forum.likes.length} threadId={forum.id} />
                <Comments
                  numberOfComments={forum.replies.length}
                  threadId={forum.id}
                  title={forum.title}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
