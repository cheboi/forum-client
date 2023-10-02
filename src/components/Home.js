import React, { useState } from "react";
import Nav from "./Nav";

const Home = () => {
  const [forum, setForum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ forum });
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
          <button className="homeBtn">CREATE FORUM</button>
        </form>
      </main>
    </>
  );
};

export default Home;
