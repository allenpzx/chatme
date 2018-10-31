import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getUser } from '../../store/actions/user.js';
class AuthRoute extends React.Component{
    state={
        user: this.props.user
    }
    
    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null
        }
        this.props.getUser();
    }

    static getDerivedStateFromProps(props, state){
        if(props.user !== state.user){
            props.history.push(props.user.redirectTo);
        }
        return null
    }

    render(){return null}
}

export default withRouter(connect(
    state=>({
        user: state.user
    }),
    dispatch=>({
        getUser: ()=>getUser(dispatch)
    })
)(AuthRoute));