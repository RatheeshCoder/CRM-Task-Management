import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/4 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Details</h3>
          <button onClick={onClose} className="text-black">&times;</button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-red-700 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
