import React from 'react';

const PostListItem = props => {
  const { post } = props;
  return (
    <div>
      {post.title}
      <button className="btn btn-danger" onClick={() => deletePost(post)}>
        Supprimer
      </button>
    </div>
  );

  function deletePost(post) {
    props.deletePostCallBack(post);
  }
};

export default PostListItem;
