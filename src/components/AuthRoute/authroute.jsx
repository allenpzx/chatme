import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import { getUser } from '../../store/actions/user.js';
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        this.props.getUser();
    }
    render(){
        const user = this.props.user || null;
        const redirectTo  = user.redirectTo || null;
        const Target = () => {
            return redirectTo ? <Redirect to={redirectTo} /> : null;
        }
        return <Target />
    }
}

export default withRouter(connect(
    state=>({
        user: state.user
    }),
    dispatch=>({
        getUser: ()=>getUser(dispatch)
    })
)(AuthRoute));