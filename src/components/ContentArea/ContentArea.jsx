import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import "./ContentArea.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ContentArea = ({ textareaRef, document, handleDocumentChange, handleKeyDown }) => {
  // state for managing the copy button animation
  const [copyButtonText, setCopyButtonText] = useState(
    <i className="far fa-copy fa-lg"></i>
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCopyButtonText(<i className="far fa-copy fa-lg"></i>);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [copyButtonText]);

  const copyToClipboardHandler = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => setCopyButtonText("copied !"),
      () => alert("Error, please copy the link from browser url bar")
    );
  };

  const generateUrlHandler = () => {
    window.location.href =
      window.location.protocol + "//" + window.location.host;
  };

  // migrate to a new user provided custom URL
  const changeUrl = () => {
    const newToken = prompt("Warning! This will transfer all your data to new a URL. Please enter the new URL to proceed.");
    // Make a POST call to the backend
    if (newToken === null) return;
    if (newToken.trim() === "") return alert("URL cannot be empty");

    const payload = {
      oldToken: window.location.pathname.substring(1),
      newToken: newToken.trim(),
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/migrate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
    
      if (response.status === 200) {
        window.location.href = `${window.location.protocol}//${window.location.host}/${newToken}`;
      } else if (response.status === 409) {
        alert("URL already exists");
        // console.log(response.body);
      }
    })
    .catch((error) => console.error(error));
  };

  const addPassword = () => {
    const password = prompt("Enter your password");
    // Make a POST call to the backend
    if (password === null) return;
    if (password.trim() === "") return alert("URL cannot be empty");

    const payload = {
      token: window.location.pathname.substring(1),
      password: password
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((response) => {
      if (response.status === 200) {
        alert("Password changed successfully");
      } else {
        alert("Error while changing password, please try again later");
        // console.log(response.body);
      }
    })
    .catch((error) => console.error(error));
  }

  return (
    <div className="main">
      <div className="top">
        <p className="titleText">
          <Button
            abbrTitle="Copy Link To Clipboard"
            className="button copyLink tooltip"
            onClickHandler={copyToClipboardHandler}
            value={copyButtonText}
          />
          <Button
            abbrTitle="Change Url"
            className="button"
            onClickHandler={changeUrl}
            value={<i className="fas fa-pencil-alt fa-lg"></i>}
          />
          <Button
            abbrTitle="Add Password"
            className="button"
            onClickHandler={addPassword}
            value={<i className="fas fa-lock fa-lg"></i>}
          />
          <Button
            abbrTitle="Generate New Random Url"
            className="button"
            onClickHandler={generateUrlHandler}
            value={<i className="fas fa-plus fa-lg"></i>}
          />
        </p>
      </div>
      <div className="contentArea">
        <textarea
          name="content"
          id="content"
          value={document}
          ref={textareaRef}
          onChange={(e) => handleDocumentChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        ></textarea>
      </div>
    </div>
  );
};

export default ContentArea;
