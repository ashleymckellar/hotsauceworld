import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CustomModal(props) {
    const { show, handleClose } = props;

    //style={{ backgroundColor: '#FED7B2' }}

    return (
        <Modal show={show} onHide={handleClose} className="modal-background">
            <Modal.Header closeButton className="modal-header-center">
                <Modal.Title className="modal-title-center">
                    New Sauce Received
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <p className='modal-text'>Thank you for submitting a new sauce.</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button onClick={handleClose} className="modal-button">
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
