import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FavoriteList from '../components/favorite-list-component';
import { fetchGif, addFavorite, deleteFavorite, fetchGifById } from '../actions/index';

class FavoriteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteFavorite = id => {
    const { deleteFavorite } = this.props;
    deleteFavorite(id);
  };

  renderFavorite = () => {
    const { favorite } = this.props;

    if (favorite) {
      return favorite.map(gif => {
        return <FavoriteList key={gif.id} gif={gif} deleteFavoriteCallBack={this.deleteFavorite} />;
      });
    }
  };

  render() {
    const { favorite } = this.props;

    return (
      <>
        {favorite ? (
          <Container>
            <Row>{this.renderFavorite()}</Row>
          </Container>
        ) : (
          <h5>Nothing...</h5>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteFavorite }, dispatch),
});

const mapStateToProps = state => {
  return {
    favorite: state.gif.favorite,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteContainer);
