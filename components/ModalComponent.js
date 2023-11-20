import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        width: '45%',
        height: '20%',
        margin: 'auto',
    },
};
const ModalComponent = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={customStyles}
        >


              <div className="d-flex flex-column justify-content-center align-items-center ">
                  {children}
                  <div className="d-flex justify-content-end">
                  <button className="btn btn-warning" onClick={onRequestClose}>OK</button>
              </div>
              </div>


        </Modal>
    );
};

export default ModalComponent;
