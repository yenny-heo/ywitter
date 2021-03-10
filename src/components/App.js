import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import fbase from "fbase";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //관찰자 연결: 사용자 로그인 상태 변경될 때 마다 호출됨
    authService.onAuthStateChanged((user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Ywitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
