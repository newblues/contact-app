import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { readAllPost, deletePost } from '../actions/index';
import PostListItem from '../components/post-list-item';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.readAllPost();
  }

  renderPosts = () => {
    const { posts } = this.props;
    if (posts) {
      return posts.map(p => {
        return <PostListItem post={p} key={p.id} deletePostCallBack={this.deletePost} />;
      });
    }
  };

  deletePost = post => {
    this.props.deletePost(post.id);
  };

  render() {
    return (
      <div className="default_margin_top">
        <h1>Boite à post</h1>
        <div>{this.renderPosts()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ readAllPost, deletePost }, dispatch),
});

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);
