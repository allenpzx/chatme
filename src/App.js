import React from "react";
import { connect } from 'react-redux';
import { withRouter, Route } from "react-router-dom";
import Login from './views/login/login.jsx';
import Register from './views/login/register.jsx';
import Main from './views/main/main.jsx';
import { getUser } from './store/actions/Auth.js';
class App extends React.Component {

  state={
    user: null
  }

  componentDidMount(){
    this.props.getUser();
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(prevState.user !== nextProps.user){
  //     return {
  //       user: nextProps.user
  //     }
  //   }

  //   return null
  // }


  render() {
    console.log(this.props.user)
    return (
      <div className="App">
          <Route path='/' component={Main} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
      </div>
    );
  }
}

export default withRouter(connect(
  state=>({
    user: state.Auth
  }),
  dispatch=>({
    getUser: ()=>{
      getUser(dispatch);
    }
  })
)(App))