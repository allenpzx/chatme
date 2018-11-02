import React from 'react';
import { connect } from 'react-redux';
import { Picker, List, Grid, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import { updateUser } from '../../store/actions/user.js';

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props)
        const user = props.user || null;
        this.state = {
            avatar: user ? user.avatar ? user.avatar : null : null,
            account: user ? user.account : '',
            gender: user ? [this.props.user.gender] : null,
            age: user ? [user.age?user.age:'18'] : '',
            discription: user ? user.discription : '',
            wanna: user ? user.wanna : ''
        }
    }

    handleAccount = e => this.setState({ account: e });
    handleGender = e => this.setState({ gender: e });
    handleAge = e => this.setState({ age: e });
    handleDiscription = e => this.setState({ discription: e });
    handleWanna = e => this.setState({ wanna: e });

    render() {
        const user = this.props.user || null;
        const genderList = [
            {
                label: '男',
                value: 'male'
            },
            {
                label: '女',
                value: 'female'
            }
        ];
        const gridHeader = this.state.avatar
            ? (
                <div>
                    <span>已选头像</span>
                    <img style={{ margin: '0 0 0 10px', width: '20px' }} src={this.state.avatar} alt='user-avatar' />
                </div>
            )
            : '请选择头像'

        const avatarList = 'man1,man2,man3,man4,man5,women1,women2,women3,women4,women5'.split(',').map(x => ({
            icon: require(`./avatars/${x}.png`),
            text: x,
        }));
        const ageList = [];
        for(let i = 18; i<101; i++){
            ageList.push({label: i.toString(), value: i.toString()});
        }

        return (
            <React.Fragment>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={ele => this.setState({ avatar: ele.icon })}
                    />
                </List>
                <WhiteSpace size="lg" />
                <List>
                    
                <InputItem
                    defaultValue={user && user.account}
                    clear
                    state={this.state.account}
                    onChange={this.handleAccount}
                    onBlur={this.handleAccount}
                >
                    用户名
                </InputItem>
                <Picker
                    data={genderList}
                    cols={1}
                    value={this.state.gender}
                    onChange={this.handleGender}
                    onOk={this.handleGender}
                >
                    <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
                <Picker
                    data={ageList}
                    cols={1}
                    value={this.state.age}
                    onChange={this.handleAge}
                    onOk={this.handleAge}
                >
                    <List.Item arrow="horizontal">年龄</List.Item>
                </Picker>
                <TextareaItem
                    autoHeight
                    title='简介'
                    defaultValue={user && user.discription}
                    value={this.state.discription}
                    onChange={this.handleDiscription}
                    onBlur={this.handleDiscription}
                />
                <InputItem
                    defaultValue={user && user.wanna}
                    value={this.state.wanna}
                    onChange={this.handleWanna}
                    onBlur={this.handleWanna}
                >期望</InputItem>
                </List>

                <WhiteSpace size="lg" />
                <Button type='primary' size="small" onClick={() => this.props.updateUser(this.state)}>保存</Button>
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        updateUser: props => console.log(props)
    })
)(PersonalInfo)