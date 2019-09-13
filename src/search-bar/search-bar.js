import React, { Component } from 'react';
import { Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchContact } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleChange = event => {
    const { searchContact } = this.props;

    this.setState({ searchInput: event.target.value });
    searchContact(event.target.value);
  };

  render() {
    const { searchInput } = this.state;

    return (
      <Input type="text" value={searchInput} onChange={this.handleChange} placeholder="Search..." />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ searchContact }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(SearchBar);
