import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// You can think of this link component right here as being nearly identical to a classic anchor tag.
import { fetchPosts } from '../actions';

class PostsIndex extends Component {

  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    // lodash function can map over an object.
    return _.map(this.props.posts, post=>{
        return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
          {post.title}
          </Link>
          {post.categories}
          {post.content}
        </li>
      );
    })
    // for (post in this.props.posts){
    //   return (
    //     <div>
    //       <div>{post.title}</div>
    //       <div>{post.categories}</div>
    //       <div>{post.content}</div>
    //     </div>
    //   )
    // }
  }

  render(){
    console.log("this.props.posts",this.props.posts)
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}
// whenever we want to consume anything from application level state, we always define our mapstatetoprops function.

function mapStateToProps(state){
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

// Wiring up an action creator with this syntax instead of using that mapstatetoprops function is completely identical in nature. 

// tThere definitely are times where you want to use a separate function. Like for example, if you want to do some computation on exactly how you want to call the action creator ahead of time.

// When are we going to call the action creator? When are we going to attempt to reach out to the API and fetch our list of posts? We really want to say the instant we know that the user is about to go to this component right here or the component is about to be shown on the screen, we want to reach out to our API and fetch this list of posts by calling this action creator. We're going to make use of a react lifecycle method.A life cycle method is a function on a react component class that is automatically called by React.