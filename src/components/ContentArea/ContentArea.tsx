import React, { useState, Dispatch, SetStateAction } from "react";
import "./ContentArea.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from "../common/Button";

interface Props {
  setDocument: Dispatch<SetStateAction<string>>;
}

const ContentArea: React.FC<Props> = ({ setDocument }) => {
  const [copyButtonText, setCopyButtonText] = useState<JSX.Element | string>(
    <i className="far fa-copy fa-lg"></i>
  );

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
          onChange={(e) => setDocument(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ContentArea;
