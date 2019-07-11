import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGif, addFavorite, deleteFavorite, fetchGifById } from '../actions/index';

import GifList from '../components/gif-list-component';

class GifContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addFavorite = gif => {
    const { addFavorite } = this.props;
    addFavorite(gif);
  };

  deleteFavorite = id => {
    const { deleteFavorite } = this.props;
    deleteFavorite(id);

    console.log('je delete mon favorite !!');
  };

  getDetails = id => {
    const { fetchGifById } = this.props;
    fetchGifById(id);
    console.log('TLC: GifContainer -> id', id);
  };

  renderGif = () => {
    const { gif, pending } = this.props;

    if (pending !== true) {
      return gif.map(gif => {
        return (
          <GifList
            key={gif.id}
            gif={gif}
            addFavoriteCallBack={this.addFavorite}
            deleteFavoriteCallBack={this.deleteFavorite}
            getDetailsCallBack={this.getDetails}
          />
        );
      });
    }
  };

  render() {
    const { pending } = this.props;

    return (
      <>
        {pending !== true ? (
          <Container>
            <Row>{this.renderGif()}</Row>
          </Container>
        ) : (
          <h5>Loading...</h5>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchGif, addFavorite, deleteFavorite, fetchGifById }, dispatch),
});

const mapStateToProps = state => {
  return {
    gif: state.gif.gif,
    pending: state.gif.pending,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifContainer);
