import React, { Component } from 'react';
// import { Button, Form, Label, Input } from 'reactstrap';
import { InputGroup, InputGroupAddon, Button, Input, Form, Label } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGif } from '../actions/index';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '100vw',
    backgroundColor: '#bdc3c7',
  },
};

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
      <div style={styles.container}>
        <h1>Welcome to my FavyGiphy App</h1>

        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              value={search}
              onChange={this.handleSearch}
              placeholder="Search all Gifs..."
              addonType="append"
            />
            <InputGroupAddon>
              <Button type="submit" value="Submit" color="secondary">
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>{' '}
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
