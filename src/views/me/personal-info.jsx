import React from 'react';
import { connect } from 'react-redux';
import { Picker, List, Grid, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import { updateUser } from '../../store/actions/user.js';

class PersonalInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatar: this.props.user.avatar || null,
            name: this.props.user.account || null,
            gender: [this.props.user.gender] || null,
            age: [this.props.user.age+''] || null,
            description: this.props.user.description || null,
            wanna: this.props.user.wanna || null
        }
    }

    // static getDerivedStateFromProps (props, state){
    //     console.log('getDerivedStateFromProps')
    //     if(!Object.is(props,state)){
    //         console.log(props, state)
    //         return {
    //             ...state,
    //             ...props.user,
    //             // gender: [props.user.gender],
    //             // age: [props.user.age+'']
    //         }
    //     }
    //     return null
    // }

    componentWillReceiveProps(props){
        if(props.user !== this.state){
            this.setState({
                avatar: props.user.avatar || null,
                name: props.user.name || null,
                gender: [props.user.gender] || null,
                age: [props.user.age+''] || null,
                description: props.user.description || null,
                wanna: props.user.wanna || null
            });
        }
    }

    handleAvatar = e => this.setState({avatar: e.icon});
    handleName = e => this.setState({ name: e });
    handleGender = e => this.setState({ gender: e });
    handleAge = e => this.setState({ age: e });
    handleDescription = e => this.setState({ description: e });
    handleWanna = e => this.setState({ wanna: e });
    handleUpdate = () => {
        const data = Object.assign({}, this.state, {
            age: this.state.age[0],
            gender: this.state.gender[0]
        });
        this.props.updateUser(data);
    }

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
                        onClick={ele => this.handleAvatar(ele)}
                    />
                </List>
                <WhiteSpace size="lg" />
                <List>
                    
                <InputItem
                    defaultValue={user && user.account}
                    clear
                    value={this.state.name}
                    onChange={this.handleName}
                    onBlur={this.handleName}
                    style={{textAlign: 'right'}}
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
                    defaultValue={user && user.description}
                    value={this.state.description}
                    onChange={this.handleDescription}
                    onBlur={this.handleDescription}
                    style={{textAlign: 'right'}}
                />
                <InputItem
                    defaultValue={user && user.wanna}
                    value={this.state.wanna}
                    onChange={this.handleWanna}
                    onBlur={this.handleWanna}
                    style={{textAlign: 'right'}}
                >期望</InputItem>
                </List>

                <WhiteSpace size="lg" />
                <Button type='primary' style={{margin: '0 auto', width: '90%'}} onClick={this.handleUpdate}>保存</Button>
                <WhiteSpace size="lg" />
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user || null
    }),
    dispatch => ({
        updateUser: props => updateUser(dispatch)(props)
    })
)(PersonalInfo)