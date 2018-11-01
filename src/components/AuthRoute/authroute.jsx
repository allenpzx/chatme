import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {getRedirectPath} from '../../utils/getRedirectPath.js';
import {getUser} from '../../store/actions/user.js';
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        this.props.getUser(this.props.history.push);
    }
    render(){return null}
}
export default withRouter(connect(
    null,
    dispatch=>({
        getUser: push=>{
            getUser(dispatch)(push);
        }
    })
)(AuthRoute));