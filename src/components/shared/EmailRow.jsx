import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import Moment from "react-moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function EmailRow({
  title,
  subject,
  time,
  description,
  starred,
  important,
  id,
}) {
  const navigate = useNavigate();
  const [starredClicked, setStarredClicked] = useState(false);
  const [importantClicked, setImportantClicked] = useState(false);
  useEffect(() => {
    setStarredClicked(starred);
    setImportantClicked(important);
  }, [starred, important]);

  const handleRowClick = () => {
    navigate(`/mail/${id}`);
  };

  const handleCheckboxClick = async (e, id) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for email id: ${id}`);
  };

  const handleStarClick = async (e) => {
    e.stopPropagation();
    const newStarredValue = !starredClicked;
    setStarredClicked(newStarredValue);
    const emailRef = doc(db, "emails", id);

    try {
      await updateDoc(emailRef, {
        starred: !starred,
      });
      console.log(`Email with id: ${id} has been updated.`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleImportantClick = async (e) => {
    e.stopPropagation();
    const newStarredValue = !starredClicked;
    setStarredClicked(newStarredValue);
    const emailRef = doc(db, "emails", id);

    try {
      await updateDoc(emailRef, {
        important: !important,
      });
      console.log(`Email with id: ${id} has been updated.`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <div className="emailRow" onClick={handleRowClick}>
      <div className="emailRow_options">
        <Checkbox onClick={handleCheckboxClick} />
        <IconButton onClick={handleStarClick}>
          <StarBorderIcon
            color={starredClicked || starred ? "primary" : "default"}
          />
        </IconButton>
        <IconButton onClick={handleImportantClick}>
          <LabelImportantOutlinedIcon
            color={importantClicked ? "secondary" : "default"}
          />
        </IconButton>
      </div>
      <p className="emailRow_title">{title}</p>
      <div className="emailRow_message">
        <p className="emailRow_subject"> {subject}</p>
        <p className="emailRow_description"> -{description}</p>
      </div>
      <div className="time">
        <Moment format="D ddd">{time}</Moment>
      </div>

      {/* <p className="emailRow_time">{time}</p> */}
    </div>
  );
}
