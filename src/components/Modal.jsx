// src/components/Modal.js

import React from 'react';

const Modal = ({ art, onClose }) => {
    if (!art) return null;

    return (
        <div className="modal" onClick={onClose}>
            <span className="close-button" onClick={onClose}>&times;</span>
            <div className="modal-content-container" onClick={e => e.stopPropagation()}>
                <img className="modal-content" src={art.src} alt={art.title} />
                <div id="caption">
                    <h3>{art.title}</h3>
                    <p>{art.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;