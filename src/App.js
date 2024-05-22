import { Routes, Route } from "react-router-dom";
import EmailList from "./components/EmailList";
import Mail from "./components/Mail";
import "./App.scss";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SendMail from "./components/SendMail";

import LogIn from "./components/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logIn } from "./redux/user";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          logIn({
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          })
        );
      }
    });
  }, []);

  return !user ? (
    <LogIn />
  ) : (
    <div className="App">
      <Header />
      <div className="app_body">
        <SideBar />
        <SendMail />
        <Routes>
          <Route path="/" element={<EmailList />} />
          <Route path="/mail/:id" element={<Mail />} />
          <Route path="/sent" element={<EmailList />} />
          <Route path="/sent/:id" element={<Mail />} />
          <Route path="/starred" element={<EmailList />} />
          <Route path="/drafts" element={<EmailList />} />
          <Route path="/snoozed" element={<EmailList />} />
          <Route path="/important" element={<EmailList />} />
          <Route path="/chats" element={<EmailList />} />
          <Route path="/schedeled" element={<EmailList />} />
          <Route path="/all" element={<EmailList />} />
          <Route path="/spam" element={<EmailList />} />
          <Route path="/trash" element={<EmailList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
