// Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, podcastDetails }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>{podcastDetails.title}</h2>
          <p>{`Seasons: ${podcastDetails.seasons}`}</p>
          {/* Display other details as needed */}
        </div>
      </div>
    )
  );
};

export default Modal;
