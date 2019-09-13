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
import { FaEdit } from 'react-icons/fa';
import { updateContact } from '../actions/index';

class ContactUpdate extends React.Component {
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
    const { contact } = this.props;
    this.setState(prevState => ({
      modal: !prevState.modal,
      username: contact.username,
      email: contact.email,
      phone: contact.phone,
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
    const { updateContact, contact } = this.props;
    const { username, email, phone, formValid } = this.state;
    const editContact = { username, email, phone, contact };

    e.preventDefault();
    if (formValid) {
      updateContact(editContact);
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
    const { contactSelected } = this.props;

    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <FaEdit className="icon" onClick={this.toggle} />

        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Edit contact
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
                  placeholder={contactSelected.username}
                  onChange={this.handleChange}
                  onFocus={this.handleChange}
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
                  placeholder={contactSelected.email}
                  onChange={this.handleChange}
                  onFocus={this.handleChange}
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
                  placeholder={contactSelected.phone}
                  onChange={this.handleChange}
                  onFocus={this.handleChange}
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

const mapStateToProps = state => {
  return {
    contactSelected: state.contact.contactSelected,
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateContact }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactUpdate);
