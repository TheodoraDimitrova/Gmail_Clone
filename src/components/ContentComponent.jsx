import React, { useEffect, useState } from "react";
import Section from "./shared/Section";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EmailRow from "./shared/EmailRow";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  where,
  unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setMails } from "../redux/mail";

function ContentComponent() {
  const [emails, setEmails] = useState([]);
  const [active, setActive] = useState(1);

  const user = useSelector((state) => state.user.user);
  const activeOption = useSelector((state) => state.activeOption);

  const dispatch = useDispatch();

  useEffect(() => {
    let q;
    if (!user || !user.email) {
      console.error("User not authenticated");
      return;
    }
    console.log("Content component", activeOption);
    switch (activeOption) {
      case "inbox":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("trash", "==", false)
        );
        // if (active === 1) {
        //   const q = query(
        //     collection(db, "emails"),
        //     orderBy("timestamp", "desc"),
        //     where("to", "==", user.email)
        //   );
        // } else if (active === 2) {
        //   console.log("promotions");
        // } else {
        //   console.log("socials");
        //   setMails([]);
        // }
        break;
      case "starred":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("starred", "==", true)
        );
        break;
      case "snoozed":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("snoozed", "==", true)
        );
        break;
      case "sent":
        q = query(
          collection(db, "emails"),
          where("from.email", "==", user.email),
          where("draft", "==", false),
          orderBy("timestamp", "desc")
        );
        break;
      case "drafts":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("from.email", "==", user.email),
          where("draft", "==", true)
        );
        break;
      case "important":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("important", "==", true)
        );
        break;
      case "chats":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("chats", "==", "chats")
        );
        break;
      case "scheduled":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("from.email", "==", user.email),
          where("scheduled", "==", true)
        );
        break;
      case "all":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email)
        );
        break;
      case "spam":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("spam", "==", true)
        );
        break;
      case "trash":
        q = query(
          collection(db, "emails"),
          orderBy("timestamp", "desc"),
          where("to", "==", user.email),
          where("trash", "==", true)
        );
        break;
      default:
        return;
    }

    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(q); // Use getDocs to fetch data
        const emailData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setEmails(emailData);
        dispatch(setMails(querySnapshot.docs.length));
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchEmails();
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const emailData = querySnapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setEmails(emailData);
    //   //set Inbox emails
    //   dispatch(setMails(querySnapshot.docs.length));
    // });

    // return () => unsubscribe();
  }, [active, user.email, activeOption]);

  return (
    <>
      {activeOption === "inbox" && (
        <div className="emailList_sections">
          <Section
            title="Primary"
            icon={<InboxIcon />}
            onClick={() => setActive(1)}
            selected={active === 1 ? "selected" : ""}
          />
          <Section
            title="Promotions"
            icon={<LocalOfferOutlinedIcon />}
            onClick={() => setActive(2)}
            selected={active === 2 ? "selected" : ""}
          />
          <Section
            title="Social"
            icon={<PeopleOutlineOutlinedIcon />}
            onClick={() => setActive(3)}
            selected={active === 3 ? "selected" : ""}
          />
        </div>
      )}
      <div className="emailList_list">
        {(() => {
          if (active === 2) {
            return (
              <>
                <p> Your Promotions tab is empty.</p>
                <p>
                  Marketing, interests, social and political causes, and other
                  promotional emails will be shown here.
                </p>
                <p>To add or remove tabs click inbox settings.</p>
              </>
            );
          } else if (active === 3) {
            return (
              <>
                <p> Your Social tab is empty.</p>
                <p>
                  Emails from social networks, media-sharing sites, dating
                  services and other social sites will be shown here.
                </p>
                <p>To add or remove tabs click inbox settings.</p>
              </>
            );
          } else {
            return emails.map((email) => {
              return (
                <EmailRow
                  key={email.id}
                  id={email.id}
                  title={email.from.displayName}
                  // title={email.to}
                  subject={email.subject}
                  starred={email.starred}
                  important={email.important}
                  // time={new Date(email.timestamp?.seconds * 1000).toUTCString()}
                  time={email.timestamp?.seconds}
                  description={email.message}
                />
              );
            });
          }
        })()}
      </div>
    </>
  );
}

export default ContentComponent;
