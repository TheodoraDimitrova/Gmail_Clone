import React from "react";
import ContentComponent from "./ContentComponent";

import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Tooltip from "@mui/material/Tooltip";
import Footer from "./shared/Footer";

export default function EmailList() {
  return (
    <div className="emailList">
      <div className="emailList_settings">
        <div className="emailList_settingsLeft">
          <Tooltip title="Select" placement="bottom">
            <Checkbox />
          </Tooltip>
          <Tooltip title="Select" placement="bottom">
            <IconButton>
              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh" placement="bottom">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More" placement="bottom">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="emailList_settingsRight">
          <p>2-24</p>
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
      <ContentComponent />
      <Footer />
    </div>
  );
}
