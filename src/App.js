import React from "react";
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import Login from './views/login/login.jsx';
import Main from './views/main/main.jsx';
import { getUser } from './store/actions/Auth.js';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount(){
    // this.props.getUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
          <Route path='/' component={Main} />
          <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default connect(
  state=>({
    user: state.Auth
  }),
  dispatch=>({
    getUser: ()=>{
      getUser(dispatch);
    }
  })
)(App)