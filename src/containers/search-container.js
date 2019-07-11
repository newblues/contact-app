import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGif } from '../actions/index';

class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = event => {
    const { fetchGif } = this.props;
    const { search } = this.state;
    event.preventDefault();
    fetchGif(search);
  };

  render() {
    const { search } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {' '}
          <Label>
            <Input
              type="text"
              value={search}
              onChange={this.handleSearch}
              placeholder="Search for Gif..."
            />{' '}
          </Label>
          <Button type="submit" value="Submit" color="primary">
            Confirm
          </Button>{' '}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchGif }, dispatch),
});

const mapStateToProps = state => {
  return {};
};
export default connect(
  null,
  mapDispatchToProps,
)(SearchContainer);
