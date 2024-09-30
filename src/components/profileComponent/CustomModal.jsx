import React from 'react';

const CustomModal = ({ showModal, setShowModal, title, primaryButtonText, onPrimaryAction }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2> {/* Título personalizado */}
        <div className="flex justify-between">
          <button
            onClick={onPrimaryAction}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-700"
          >
            {primaryButtonText}
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
