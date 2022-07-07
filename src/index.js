import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

// import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import reducers from './reducers';

// We're going to import Redux Promise and then wire that up to the apply middleware call. So we'll import promise from Redux-Promise and then we will pass that into the applymiddleware call right here.
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// class Hello extends React.Component {
//   render(){
//     return (
//       <div>Hello!</div>
//     )
//   }
// }

// class Goodbye extends React.Component {
//   render(){
//     return (
//       <div>Goodbye!</div>
//     )
//   }
// }

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
      <Switch>
        <Route path='/posts/new' component={PostsNew} />
        <Route path="/" component={PostsIndex} />
      </Switch>
    </div>
      {/* <div>
        <Route path="/hello" component={Hello} />
        <Route path="/goodbye" component={Goodbye} />
      </div> */}
    </BrowserRouter>
    {/* <App /> Now that we have React Router, we don't really have any central single component going on.*/}
  </Provider>
  , document.querySelector('.container'));
