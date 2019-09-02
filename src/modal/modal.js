/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { addContact } from '../actions/index';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      userName: '',
      email: '',
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeUserName = event => {
    this.setState({ userName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = event => {
    const { name, userName, email } = this.state;
    const newContact = { name, userName, email };
    const { addContact } = this.props;

    event.preventDefault();
    this.setState({
      name: '',
      userName: '',
      email: '',
    });
    addContact(newContact);
  };

  render() {
    const { name, userName, email } = this.state;

    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Contact
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Create new contact
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      value={name}
                      placeholder="John Doe"
                      onChange={this.handleChangeName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="username">User Name</Label>
                    <Input
                      type="text"
                      value={userName}
                      placeholder="John123"
                      onChange={this.handleChangeUserName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  value={email}
                  placeholder="john@doe.com"
                  onChange={this.handleChangeEmail}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
              <Button type="submit" value="submit" color="primary" onClick={this.toggle}>
                Save
              </Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addContact }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(ModalExample);
