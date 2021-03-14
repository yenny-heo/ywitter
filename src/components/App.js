import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //관찰자 연결: 사용자 로그인 상태 변경될 때 마다 호출됨
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          const initializeName = async (email) => {
            await userObj.updateProfile({
              displayName: email,
            });
          };
          initializeName(user.email);
        }
        //user 정보 중 필요한 정보만 저장: state가 바뀌었을 때, react가 얕은 비교를 수행하기 때문에 리렌더링이 되지 않는 버그를 없애줌
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else setIsLoggedIn(false);
      //준비 완료
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
