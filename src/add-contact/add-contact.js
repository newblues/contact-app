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
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { addContact } from '../actions/index';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: '',
      email: '',
      phone: '',
      formErrors: { username: '', email: '', phone: '' },
      usernameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false,
    };
    this.initialState = this.state;
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      username: '',
      email: '',
      phone: '',
      usernameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false,
    }));
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = e => {
    const { addContact } = this.props;
    const { username, email, phone, formValid } = this.state;
    const newContact = { username, email, phone };

    e.preventDefault();
    if (formValid) {
      addContact(newContact); // redux storage
      this.toggle();
    }
  };

  validateForm = () => {
    const { usernameValid, emailValid, phoneValid } = this.state;
    this.setState({
      formValid: usernameValid && emailValid && phoneValid,
    });
  };

  validateField(fieldName, value) {
    const { formErrors } = this.state;
    let { usernameValid, emailValid, phoneValid } = this.state;

    switch (fieldName) {
      case 'username':
        usernameValid = value.match(/^[a-zA-Z ]*$/) && value.length > 0;
        formErrors.username = usernameValid ? '' : '*Please enter valid username.';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length > 0;
        formErrors.email = emailValid ? '' : '*Please enter valid email.';
        break;
      case 'phone':
        phoneValid = value.match(/^[0-9]/) && value.length === 10;
        formErrors.phone = phoneValid ? '' : '*Please enter valid mobile no (01123456789).';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        usernameValid,
        emailValid,
        phoneValid,
      },
      this.validateForm,
    );
  }

  render() {
    const {
      username,
      email,
      phone,
      modal,
      formErrors,
      formValid,
      usernameValid,
      emailValid,
      phoneValid,
    } = this.state;

    const closeBtn = (
      // eslint-disable-next-line react/button-has-type
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Contact
        </Button>
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Create new contact
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  required
                  valid={usernameValid}
                  invalid={!!formErrors.username}
                  type="text"
                  value={username}
                  name="username"
                  placeholder="John"
                  onChange={this.handleChange}
                />
                {!!formErrors.username && <FormFeedback>{formErrors.username}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  valid={emailValid}
                  invalid={!!formErrors.email}
                  type="text"
                  value={email}
                  name="email"
                  placeholder="john@doe.com"
                  onChange={this.handleChange}
                />
                {!!formErrors.email && <FormFeedback>{formErrors.email}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  required
                  valid={phoneValid}
                  invalid={!!formErrors.phone}
                  type="text"
                  value={phone}
                  name="phone"
                  placeholder="+33123456789"
                  onChange={this.handleChange}
                />
                {!!formErrors.phone && <FormFeedback>{formErrors.phone}</FormFeedback>}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
              <Button type="submit" value="submit" color="primary" disabled={!formValid}>
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
)(AddContact);
