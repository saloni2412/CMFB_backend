import React, { useState, useEffect } from 'react';
import './../../scss/snackbar.scss'; // You need to create this CSS file

const Snackbar = ({ message, duration = 3000, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    const timeout = setTimeout(() => {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div className={`snackbar ${isOpen ? 'show' : ''}`}>
      <p className='m-0'>{message}</p>
    </div>
  );
};

export default Snackbar;
