import React, { useState } from 'react'

function AddArticle() {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden'; // prevent scrolling of background
    };
  
    const closeModal = () => {
      setIsOpen(false);
      document.body.style.overflow = ''; // restore scrolling of background
    };

  return (
      <>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={openModal}>
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div> {/* Background overlay */}
            <div className="bg-white p-8 rounded-lg z-10 relative">
              <h2 className="text-xl font-bold mb-4">Modal Title</h2>
              <form>
                {/* Your form fields go here */}
              </form>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg absolute bottom-8 right-8" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AddArticle
