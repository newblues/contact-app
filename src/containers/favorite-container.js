import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FavoriteList from '../components/favorite-list-component';

class FavoriteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFavorite = () => {
    const { favorite } = this.props;

    if (favorite.favorite) {
      return favorite.favorite.map(gif => {
        return <FavoriteList key={gif.id} gif={gif} />;
      });
    }
  };

  render() {
    const { favorite } = this.props;
    console.log('TLC: FavoriteContainer -> render -> favorite', favorite);

    return (
      <>
        {favorite.favorite ? (
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
  ...bindActionCreators({}, dispatch),
});

const mapStateToProps = state => {
  return {
    favorite: state.favorite,
  };
};
export default connect(
  mapStateToProps,
  null,
)(FavoriteContainer);
