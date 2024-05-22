import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/user";
import { getAuth, signOut } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import TuneIcon from "@mui/icons-material/Tune";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const sign_Out = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(" An error happened.");
      });
  };

  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          onClick={() => navigate("/")}
          src="https://blog.logomyway.com/wp-content/uploads/2021/02/gmail-logo.jpg"
          alt="logo"
        />
      </div>

      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search mail" />
        <Tooltip title="Show search options" placement="bottom">
          <IconButton>
            <TuneIcon className="header_input_arrow" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="header__right">
        <Tooltip title="Support" placement="bottom">
          <IconButton>
            {" "}
            <HelpOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" placement="bottom">
          <IconButton>
            {" "}
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Google Apps" placement="bottom">
          <IconButton>
            {" "}
            <AppsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            <div>
              Google Account
              <br />
              {user?.displayName}
              <br /> {user?.email}
            </div>
          }
          placement="bottom"
        >
          <div className="avatar" onClick={sign_Out}>
            <img
              src={user?.photoURL}
              alt="photoUrl"
              referrerPolicy="no-referrer"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
