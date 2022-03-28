import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function VerticallyCenteredModal(props) {
  let r = (Math.random() + 1).toString(36).substring(7);

  return (
    <Modal {...props} size="lg" aria-labelledby={r} centered>
      <Modal.Header closeButton>
        <Modal.Title id={r}>
          {props.Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VerticallyCenteredModal;
