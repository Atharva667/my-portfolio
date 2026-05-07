// src/components/Gallery.js

import React from 'react';

const Gallery = ({ artPieces, onImageClick }) => {
    return (
        <section id="gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
                {artPieces.map(art => (
                    <div 
                        className="gallery-item" 
                        key={art.id} 
                        onClick={() => onImageClick(art)}
                    >
                        <img src={art.src} alt={art.title} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;