import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import YweetFactory from "components/YweetFactory";
import Yweet from "components/Yweet";

const Home = ({ userObj }) => {
  const [yweets, setYweets] = useState([]);

  useEffect(() => {
    //DB 변화(CRUD)를 실시간 감지하는 리스너 부착
    dbService
      .collection("yweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const yweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setYweets(yweetArray);
      });
  }, []);

  return (
    <div>
      <YweetFactory userObj={userObj} />
      <div>
        {yweets.map((yweet) => (
          <Yweet
            key={yweet.id}
            yweetObj={yweet}
            isOwner={yweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
