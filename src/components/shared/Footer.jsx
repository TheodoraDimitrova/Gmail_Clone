import React from "react";

function Footer() {
  return (
    <div className="emailList_footer">
      <div className="used">
        <span>0.04 GB</span> of <span>15 GB used</span>
        <div>Follow link to manage storage</div>
      </div>
      <div>
        <a
          href="https://www.google.com/intl/en/policies/terms/"
          target="_blank"
          rel="noreferrer"
        >
          Terms
        </a>{" "}
        ·
        <a
          href="https://www.google.com/intl/en/policies/privacy/"
          target="_blank"
          rel="noreferrer"
        >
          Privacy
        </a>{" "}
        ·{" "}
        <a
          href="https://www.google.com/gmail/about/policy/"
          target="_blank"
          rel="noreferrer"
        >
          Program Policies
        </a>{" "}
      </div>
      <div className="activity">
        <div>Last account activity: 0 minutes ago</div>Open in 1 other location
        ·{" "}
        <span>
          <span>Details</span>
        </span>
      </div>
    </div>
  );
}

export default Footer;
