import React from 'react';
import {connect} from 'react-redux';
import { List, Grid } from 'antd-mobile';
import {updateAvatar} from '../../store/actions/user.js';

class AvatarSelector extends React.Component{

    constructor(props){
        super(props)
        this.state={
            icon: null
        }
    }

    render(){

        const gridHeader = this.state.icon
            ? (
                <div>
                    <span>已选头像</span>
                    <img style={{margin: '0 0 0 10px', width: '20px'}} src={this.state.icon} alt='user-avatar'/>
                </div>
            )
            : '请选择头像'

        const avatarList = 'man1,man2,man3,man4,man5,women1,women2,women3,women4,women5'.split(',').map(x=>({
            icon: require(`./avatars/${x}.png`),
            text: x,
        }))
        return (
            <List renderHeader={()=>gridHeader}>
                <Grid 
                    data={avatarList} 
                    columnNum={5} 
                    onClick={ele=>{
                        this.setState({icon: ele.icon})
                        this.props.updateAvatar(ele.text)
                    }}
                />
            </List>
        )
    }
}

export default connect(
    state=>({
        user: state.user || null
    }),
    dispatch=>({
        updateAvatar: name=>updateAvatar(dispatch)(name)
    })
)(AvatarSelector)