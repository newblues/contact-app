import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGif, addFavorite, deleteFavorite } from '../actions/index';

import GifList from '../components/gif-list-component';

class GifContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
    };
  }

  addFavorite = gif => {
    const { addFavorite } = this.props;
    addFavorite(gif);
  };

  deleteFavorite = id => {
    const { deleteFavorite } = this.props;
    deleteFavorite(id);
  };

  renderGif = () => {
    const { gif, pending, favorite } = this.props;

    if (pending !== true) {
      return gif.map(gif => {
        return (
          <GifList
            key={gif.id}
            gif={gif}
            addFavoriteCallBack={this.addFavorite}
            deleteFavoriteCallBack={this.deleteFavorite}
            starred={favorite.some(elem => gif.id === elem.id)}
          />
        );
      });
    }
  };

  render() {
    const { pending } = this.props;

    return (
      <div>
        {pending !== true ? (
          <Container>
            <Row>{this.renderGif()}</Row>
          </Container>
        ) : (
          <h5>Loading...</h5>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchGif, addFavorite, deleteFavorite }, dispatch),
});

const mapStateToProps = state => {
  return {
    gif: state.gif.gif,
    favorite: state.gif.favorite,
    pending: state.gif.pending,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifContainer);
