import React, { useState } from "react";

import { Button } from "@mui/material";
import SideBarOption from "./shared/SideBarOption";
import SideBarMore from "./SideBarMore";
import InboxIcon from "@mui/icons-material/Inbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useDispatch, useSelector } from "react-redux";
import { openSendMeggase } from "../redux/mail";
import { useNavigate } from "react-router-dom";
import { setActiveOption } from "../redux/activeOption";
import LabelSection from "./LabelSection";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mail.mails);
  const activeOption = useSelector((state) => state.activeOption);
  const navigate = useNavigate();

  const handleOptionClick = (option, url) => {
    dispatch(setActiveOption(option));
    navigate(url);
  };
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="sideBar">
      <Button
        onClick={() => dispatch(openSendMeggase())}
        className="sidebar_compose"
        startIcon={<CreateOutlinedIcon size="large" />}
      >
        Compose
      </Button>
      <SideBarOption
        icon={<InboxIcon />}
        title="Inbox"
        isActive={activeOption === "inbox"}
        onClick={() => handleOptionClick("inbox", "/")}
        number={mails}
      />
      <SideBarOption
        icon={<StarBorderIcon />}
        title="Starred"
        isActive={activeOption === "starred"}
        onClick={() => handleOptionClick("starred", "starred")}
      />
      <SideBarOption
        icon={<AccessTimeIcon />}
        title="Snoozed"
        isActive={activeOption === "snoozed"}
        onClick={() => handleOptionClick("snoozed", "/snoozed")}
      />
      <SideBarOption
        icon={<SendOutlinedIcon />}
        title="Sent"
        isActive={activeOption === "sent"}
        onClick={() => handleOptionClick("sent", "/sent")}
      />
      <SideBarOption
        icon={<InsertDriveFileOutlinedIcon />}
        title="Drafts"
        onClick={() => handleOptionClick("drafts", "/drafts")}
      />
      <SideBarOption
        icon={
          isExpanded ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )
        }
        title="More"
        isActive={false}
        onClick={handleClick}
      />
      <SideBarMore
        isExpanded={isExpanded}
        handleOptionClick={handleOptionClick}
        activeOption={activeOption}
      />

      <LabelSection />
    </div>
  );
}
