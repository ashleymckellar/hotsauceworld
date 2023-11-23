import React from "react"
import { Modal, Button } from "react-bootstrap"

export default function CustomModal(props) {
    const {show, handleClose} = props
    
        return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Sauce Received</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Thank you for submitting a new sauce.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>OK</Button>
                
            </Modal.Footer>
        </Modal>
    )
}