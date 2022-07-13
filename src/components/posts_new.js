import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
// You can essentially think of this function 'reduxForm' as being identical, or at least very similar to the Connect helper that we've been using from React Redux.
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){
    // let { touched, error } = field.meta;
    let { meta: {touched, error} } = field;
    const hasDanger=touched&&error?"has-danger":'';
    return (
      <div className={`form-group ${hasDanger}`}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input }
          // Field input is an object which contains a bunch of different event handlers and a bunch of different props (like on On Change and on Blur, on Focus, it also has the value of the input. ...field.input - we want all of the different properties in this object to be communicated as props to the input tag.    Don't need to write code like onChange={field.input.onChange}
        />
        {/*  property that is automatically placed on the field object that is responsible for handling validation. */}
        <div className="text-help">
          {/* {field.meta.touched?field.meta.error:''} */}
          {touched?error:''}
        </div>
        {/* We're making use of meta property that's being tracked internally by redux form called 'Touched' - means the user has focused this input and then focused away from it. */}
      </div>
    )
  }

  onSubmit(values){
    // this === component
    console.log(values);
    // Whenever we think about saving data or making API requests of any type inside of a Redux application, we always want to be thinking about action creators.
    
    // this.props.createPost(values);
    this.props.createPost(values,()=>{
      this.props.history.push('/');
    });
    // Pass as a callback so that we only navigate back to homepage after post has been created.
  }

  render(){
    //  handleSubmit fn is a property that is being passed to the component on behalf of Redux form.
    const { handleSubmit } = this.props;
    return (
      // {/* New Post */}
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {/*  the field component is used to represent a distinct input that will be visible on the screen to our users. */}
        <Field 
          label='Title for Post'
          // If we pass arbitrary properties (like 'label') with any given name to this field component, they will be automatically attached to the 'field' argument inside of the renderField function.
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name="categories"
          component={this.renderField}
        />
        <Field 
          label="Post Content"
          name='content'
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  console.log(values);    // { title: "123", categories: "456", content: "789" }
  const errors={};
  // Validate inputs from 'values'
  if (!values.title){
    errors.title="Enter a title!";
  }
  if (!values.categories){
    errors.categories="Enter some categories!";
  }
  if (!values.content){
    errors.content="Enter some content for our post!";
  }
  // If errors object is empty, the form is fine to submit.
  // If errors object has any properties redux form assumes form is invalid.
  return errors;
}

// The validate function will be called automatically by redux form whenever a user attempts to submit the form.
// export default reduxForm({
//   validate,
//   form: 'PostsNewForm'
// })(PostsNew);

// Redux form is already being used in the exact same style as our Connect helper. So how do we combine these two different helpers together?

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
  );

// this is how we stack up multiple connect like helpers