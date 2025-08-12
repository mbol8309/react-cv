import React, { useEffect, useState } from 'react';

const ProfileAdditional = ({ icono, texto, url }) => {
    // Genera la URL correcta para la imagen
  const iconUrl = new URL(`../assets/${icono}`, import.meta.url).href;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
        src={iconUrl} 
        alt={texto} 
        style={{ width: '20px', height: '20px' }} 
      />
            {url && url.trim() !== '' ? (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {texto}
                </a>
            ) : (
                <span>{texto}</span>
            )}
        </div>
    );
};

export default ProfileAdditional;