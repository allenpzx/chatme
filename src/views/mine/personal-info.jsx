import React from 'react';
import {connect} from 'react-redux';
import { Picker, List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import {updateUser} from '../../store/actions/user.js';
class PersonalInfo extends React.Component {

    state={
        account: '',
        gender: '',
        discription: '',
        wanna: ''
    }

    handleGender = e => {
        this.setState({gender: e[0]});
    }

    render() {
        const user = this.props.user || null;
        const gender = user && user.gender || null;
        const gnederList = [
            {
                label: '男',
                value: 'male'
            },
            {
                label: '女',
                value: 'female'
            }
        ];

        console.log(this.state)

        return (
            <List>
                <InputItem 
                    clear
                    onChange={(v) => { console.log('onChange', v); }}
                    onBlur={(v) => { console.log('onBlur', v); }}
                >用户名</InputItem>
                <Picker 
                    data={gnederList} 
                    cols={1} 
                    value={this.state.gender} 
                    onChange={this.handleGender}
                    onOk={this.handleGender}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <InputItem >简介</InputItem>
                <InputItem >期望</InputItem>
            </List>
        )
    }
}

export default connect(
    state=>({
        user: state.user
    }),
    dispatch=>({
        updateUser: updateUser()
    })
)(PersonalInfo)