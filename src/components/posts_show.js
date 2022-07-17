import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component{

  componentDidMount(){
    // if (!this.props.post){     // If you don't want to refetch posts
    const { id }=this.props.match.params;
    this.props.fetchPost(id);
    // }
  }

  onDeleteClick(){
    const { id }=this.props.match.params;
    // this.props.deletePost(this.props.post.id);   // Also would work - more risky as post might not yet have been fetched.
    this.props.deletePost(id,()=>{
      this.props.history.push('/');
    });
  }

  render(){
    // posts[this.props.match.params.id]; // The post we want to show
    const { post } = this.props;
    //  if we render this component, when a post has not yet been fetched correctly, we'll show the loading div. And then once the post is fetched and this component re renders, we will then have a post available
    if(!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to='/' className='btn btn-primary'>Back to Posts Index</Link>
        <button 
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

// function mapStateToProps(state){
function mapStateToProps({ posts }, ownProps){
  // the first argument to it is our application state. But there is a second argument. The second argument is referred to by convention as ownProps. Own props is the props object that is headed or going to this component.
  // return { posts };
  return { post: posts[ownProps.match.params.id]}; 
  //  this is a very important technique to be aware of that you can really use mapStateToProps, not just to select little pieces of state off the global state object, but also to do some intermediate calculation of sorts inside here as well.
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);