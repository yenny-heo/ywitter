import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [yweet, setYweet] = useState("");
  const [yweets, setYweets] = useState([]);
  const getYweets = async () => {
    const dbYweets = await dbService.collection("yweets").get();
    dbYweets.forEach((doc) => {
      const yweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setYweets((prev) => [yweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getYweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("yweets").add({
      yweet,
      createAt: Date.now(),
    });
    setYweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setYweet(value);
  };
  console.log(yweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={yweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Yweet" />
      </form>
      <div>
        {yweets.map((yweet) => (
          <div key={yweet.id}>
            <h4>{yweet.yweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
