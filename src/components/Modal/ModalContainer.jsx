import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

export const ModalContainer = ({
  title,
  children,
  show,
  onCloseClick,
  onAddClick,
}) => (
  <Modal
    show={show}
    onHide={onCloseClick}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCloseClick}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onAddClick}>
        Add
      </Button>
    </Modal.Footer>
  </Modal>
);

ModalContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};
