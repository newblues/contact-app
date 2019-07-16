import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGif, addFavorite, deleteFavorite, fetchGifById } from '../actions/index';

import GifList from '../components/gif-list-component';

class GifContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
    };
  }

  addFavorite = (gif, isFavorite) => {
    const { addFavorite } = this.props;
    addFavorite(gif);

    console.log('fav or not', isFavorite);
  };

  deleteFavorite = id => {
    const { deleteFavorite } = this.props;
    deleteFavorite(id);

    console.log('je delete mon favorite !!');
  };

  getDetails = gif => {};

  renderGif = () => {
    const { gif, pending } = this.props;

    if (pending !== true) {
      return gif.map(gif => {
        const isLike = false;
        // const isFound = this.props.gif.some(r => this.props.favorite.indexOf(r) >= 0);
        // if (isFound === true) {
        //   this.setState({
        //     isLike: isFound,
        //   });
        // }

        return (
          <GifList
            key={gif.id}
            gif={gif}
            addFavoriteCallBack={this.addFavorite}
            deleteFavoriteCallBack={this.deleteFavorite}
            getDetailsCallBack={this.getDetails}
            // isLike={this.state.isLike}
          />
        );
      });
    }
  };

  render() {
    const { pending } = this.props;

    console.log(this.state.isFavorite);

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
  ...bindActionCreators({ fetchGif, addFavorite, deleteFavorite, fetchGifById }, dispatch),
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
