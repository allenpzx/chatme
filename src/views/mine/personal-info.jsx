import React from 'react';
import { connect } from 'react-redux';
import { Picker, List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { updateUser } from '../../store/actions/user.js';
class PersonalInfo extends React.Component {

    state = {
        account: '',
        gender: '',
        discription: '',
        wanna: ''
    }

    handleAccount = e => this.setState({ account: e });
    handleGender = e => this.setState({ gender: e[0] });
    handleDiscription = e => this.setState({ discription: e });
    handleWanna = e => this.setState({ wanna: e });

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

        console.log(user)

        return (
            <List>
                <InputItem
                    defaultValue={user.account}
                    clear
                    state={this.state.account}
                    onChange={this.handleAccount}
                    onBlur={this.handleAccount}
                >用户名</InputItem>
                <Picker
                    defaultValue={user.gender}
                    data={gnederList}
                    cols={1}
                    value={this.state.gender}
                    onChange={this.handleGender}
                    onOk={this.handleGender}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <InputItem
                    defaultValue={user.discription}
                    value={this.state.discription}
                    onChange={this.handleDiscription}
                    onBlur={this.handleDiscription}
                >
                    简介
                </InputItem>
                <InputItem
                    defaultValue={user.wanna}
                    value={this.state.wanna}
                    onChange={this.handleWanna}
                    onBlur={this.handleWanna}
                >期望</InputItem>
            </List>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        updateUser: updateUser()
    })
)(PersonalInfo)