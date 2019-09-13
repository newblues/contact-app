import React from 'react';
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const { info } = this.props;
    console.log('TLC: ContactInfo -> render -> info', info);

    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {info.username}{' '}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <FaEnvelope className="mr-3" />
                {info.email}
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {' '}
                <FaPhone className="mr-3" />
                {info.phone}
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ContactInfo;
