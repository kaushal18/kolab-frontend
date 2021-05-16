import React from "react";
import { useParams } from "react-router-dom";
import "./ContentArea.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ContentArea = () => {
  const { token } = useParams();

  // todo - check if token is password protected

  return (
    <div className="main">
      <div className="top">
        <p className="titleText">
          Share with just a link 👉
          <abbr title="copy link to clipboard">
            <button className="button copyLink">
              <i className="far fa-copy fa-lg"></i>
            </button>
          </abbr>
          <abbr title="change url">
            <button className="button" id="migrateUrlBtn">
              <i className="fas fa-pencil-alt fa-lg"></i>
            </button>
          </abbr>
          <abbr title="add password">
            <button className="button">
              <i className="fas fa-lock fa-lg"></i>
            </button>
          </abbr>
          <abbr title="generate new random url">
            <button className="button" id="newUrlBtn">
              <i className="fas fa-plus fa-lg"></i>
            </button>
          </abbr>
        </p>
      </div>
      <div className="contentArea">
        <textarea name="content" id="content"></textarea>
      </div>
    </div>
  );
};

export default ContentArea;
