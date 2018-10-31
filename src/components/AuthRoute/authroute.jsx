import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from '../../store/actions/user.js';
class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null
        }

        axios.get('/api/v1/user')
        .then(res=>{
            console.log(res)
            if(res.status === 200){
                const islogin = res.data.code === 1
                if(islogin){

                }else{
                    this.props.history.push('/login');
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return null
    }
}

export default withRouter(connect(
    state=>({
        user: state.user
    })
)(AuthRoute));