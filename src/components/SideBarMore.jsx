import React from "react";
import SideBarOption from "./shared/SideBarOption";

import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import ChatIcon from "@mui/icons-material/Chat";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";

function SideBarMore({ isExpanded, handleOptionClick, activeOption }) {
  const options = [
    { icon: <LabelImportantIcon />, title: "important", url: "/important" },
    { icon: <ChatIcon />, title: "chats", url: "/chats" },
    { icon: <ScheduleSendIcon />, title: "schedeled", url: "/schedeled" },
    { icon: <MarkAsUnreadIcon />, title: "all", url: "/all" },
    { icon: <ReportIcon />, title: "spam", url: "/spam" },
    { icon: <DeleteIcon />, title: "trash", url: "/trash" },
  ];

  if (isExpanded) {
    return (
      <div>
        {options.map((option, index) => (
          <SideBarOption
            key={index}
            icon={option.icon}
            title={option.title}
            isActive={activeOption === option.title}
            onClick={() => handleOptionClick(option.title, option.url)}
          />
        ))}
      </div>
    );
  }
  return null;
}

export default SideBarMore;
