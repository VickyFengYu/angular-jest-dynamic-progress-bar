// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(<h1>Let there be light.</h1>, document.querySelector('#root'));



import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'


const store = createStore(rootReducer)

class NewReduxPractice extends Component {
  render() {

    // <div className={this.props.className}>{this.props.children}</div>;
    return <Provider store={store}>
      <App />
    </Provider>;

  }
}

NewReduxPractice.defaultProps = {
  className: 'NewReduxPractice'
};

NewReduxPractice.propTypes = {
  /** Class name */
  className: PropTypes.node,
  /** Children inside component */
  children: PropTypes.node
}; 

export default NewReduxPractice;

// import React from 'react'
// import { render } from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import App from './components/App'
// import rootReducer from './reducers'

// const store = createStore(rootReducer)

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )




