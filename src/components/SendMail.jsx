import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MinimizeIcon from "@mui/icons-material/Minimize";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import { toggleSendMesage } from "../redux/mail";
import { closeSendMessage } from "../redux/mail";
import { auth, db } from "../firebase";

import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export default function SentMail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const sendMessageIsOpen = useSelector(
    (state) => state.mail.sendMessageIsOpen
  );
  const isExpandSendMessage = useSelector(
    (state) => state.mail.isExpandSendMessage
  );
  const [isDraft, setIsDraft] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    addDoc(collection(db, "emails"), {
      from: user,
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
      starred: false,
      important: false,
      snoozed: false,
      draft: isDraft,
      spam: false,
      trash: false,
      schedeled: false,
    });
    dispatch(closeSendMessage());
    reset();
  };

  const handleClose = (formData) => {
    setIsDraft(true);

    addDoc(collection(db, "emails"), {
      from: user,
      to: formData.to || "",
      subject: formData.subject || "",
      message: formData.message || "",
      timestamp: serverTimestamp(),
      starred: false,
      important: false,
      snoozed: false,
      draft: isDraft,
      spam: false,
      trash: false,
      schedeled: false,
    })
      .then(() => {
        console.log("Draft saved successfully!");
        dispatch(closeSendMessage());
      })
      .catch((error) => {
        console.error("Error saving draft:", error);
      });
  };

  const CustomButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "12px 22px",
    marginTop: "10px",
    lineHeight: 1.5,
    backgroundColor: "#0b57d0",
    borderRadius: "18px",
    cursor: "pointer",
    display: "inline-flex",
    color: "white",
    "&:hover": {
      backgroundColor: "#0b57d0",
      boxShadow: "0px 5px 7px 0px rgba(0, 0, 0, 0.24)",
    },
  });

  return (
    sendMessageIsOpen && (
      <div className="sendMail">
        <div className="sendMail_header">
          <h3>New message</h3>
          <div className="icons">
            <MinimizeIcon onClick={() => dispatch(toggleSendMesage())} />
            <CloseIcon onClick={handleClose} />
          </div>
        </div>
        {isExpandSendMessage && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="To"
              name="to"
              {...register("to", { required: "This is required." })}
            />
            <ErrorMessage
              errors={errors}
              name="to"
              render={({ message }) => <p className="error">{message}</p>}
            />

            <input
              type="text"
              placeholder="Subject"
              name="subject"
              {...register("subject", { required: "This is required." })}
            />
            <ErrorMessage
              errors={errors}
              name="subject"
              render={({ message }) => <p className="error">{message}</p>}
            />

            <textarea
              name="message"
              type="text"
              placeholder="Message..."
              className="sendMail_message"
              {...register("message", {
                required: "This field can't be empty",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="message"
              render={({ message }) => <p className="error">{message}</p>}
            />
            <div className="sendMail_options">
              <CustomButton className="sendMail_send" type="submit">
                Send
                <ArrowDropDownIcon />
              </CustomButton>
              <CustomButton>
                <DeleteOutlineIcon
                  onClick={() => dispatch(closeSendMessage())}
                />
              </CustomButton>
            </div>
          </form>
        )}
      </div>
    )
  );
}
