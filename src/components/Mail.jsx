import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { db } from "../firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Mail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      const docRef = doc(db, "emails", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEmail(docSnap.data());
      }
    };

    fetchEmail();
  }, [params.id]);
  const deleteMail = async (e) => {
    console.log("move to trash ");
    // try {
    //   await deleteDoc(doc(db, "emails", params.id));
    //   console.log("Conversation moved to Trash.", params.id);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }

    const emailRef = doc(db, "emails", params.id);

    try {
      await updateDoc(emailRef, {
        trash: true,
      });
      console.log(`Email with id: ${params.id} has been meveed to trash.`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
    navigate("/");
  };

  return (
    <div className="mail">
      <div className="mail_tools">
        <div className="mail_tools_left">
          <IconButton onClick={() => navigate("/")}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <ArchiveOutlinedIcon />
          </IconButton>
          <IconButton>
            <ErrorOutlineOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => deleteMail()}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
          <div className="vl"></div>

          <IconButton>
            <EmailOutlinedIcon />
          </IconButton>
          <IconButton>
            <WatchLaterOutlinedIcon />
          </IconButton>
          <IconButton>
            <AddTaskOutlinedIcon />
          </IconButton>
          <div className="vl"></div>
          <IconButton>
            <LabelImportantOutlinedIcon />
          </IconButton>
          <IconButton>
            <DriveFileMoveOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
        <div className="mail_tools_right">
          <p>2-24</p>
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail_body">
        <div className="mailbody_header">
          <div className="mailHeader_left">
            <h2>{email.subject}</h2>
          </div>
          <div className="mailHeader_right">
            <div className="mailNody_header_right">
              <IconButton>
                <LocalPrintshopOutlinedIcon />
              </IconButton>
              <IconButton>
                <OpenInNewOutlinedIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="mail_message">
          <div className="mailMessage_header">
            <div className="avatar">
              <img
                src={email.from?.photoURL}
                alt="photoUrl"
                referrerPolicy="no-referrer"
              />
              <h5>
                {email.from?.displayName}-{email.from?.email}
              </h5>
              <p>To {email.to}</p>
            </div>
            <div className="icons">
              <p>
                {new Date(email.timestamp?.seconds * 1000).toUTCString()}ssss
              </p>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <KeyboardReturnIcon />
              </IconButton>
            </div>
          </div>
          <p>{email.message}</p>
        </div>
      </div>
    </div>
  );
}
