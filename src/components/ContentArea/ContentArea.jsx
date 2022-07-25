import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import "./ContentArea.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ContentArea = ({ textareaRef, document, handleDocumentChange, handleKeyDown }) => {
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
      () => setCopyButtonText("copied"),
      () => alert("error, please copy the link from browser url bar")
    );
  };

  const generateUrlHandler = () => {
    window.location.href =
      window.location.protocol + "//" + window.location.host;
  };

  return (
    <div className="main">
      <div className="top">
        <p className="titleText">
          Share with just a link 👉
          <Button
            abbrTitle="copy link to clipboard"
            className="button copyLink"
            onClickHandler={copyToClipboardHandler}
            value={copyButtonText}
          />
          <Button
            abbrTitle="change url"
            className="button"
            onClickHandler={undefined}
            value={<i className="fas fa-pencil-alt fa-lg"></i>}
          />
          <Button
            abbrTitle="add password"
            className="button"
            onClickHandler={undefined}
            value={<i className="fas fa-lock fa-lg"></i>}
          />
          <Button
            abbrTitle="generate new random url"
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
